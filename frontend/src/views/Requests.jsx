import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistance } from "date-fns";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../components/GlobalLoading";
import { auth, db } from "../firebase";
import { formatNumber, getItemCategoryIcon } from "../utils/helpers";
import SignTransaction from "../components/SignTransaction";

const Requests = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requests, setRequests] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const user = useSelector(state => state.user.value);
  const secondaryColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const toast = useToast();
  const dispatch = useDispatch();

  // get requests
  useEffect(() => {
    if (!user) return;

    (async () => {
      let requestsRef = collection(db, "requests");
      const q = query(
        requestsRef,
        where("ownerPublicKey", "==", user.publicKey)
      );
      const querySnapshot = await getDocs(q);
      setRequests(
        querySnapshot.docs
          .map(el => (el = { ...el.data(), id: el.id }))
          .sort((a, b) =>
            a.requestedAt.seconds < b.requestedAt.seconds ? 1 : -1
          )
      );
    })();
  }, [user]);

  if (!requests) return <GlobalLoading />;

  const decline = id => {
    // remove from firestore
    deleteDoc(doc(db, "requests", id));

    // remove from UI
    setRequests(requests => requests.filter(el => el.id !== id));

    toast({
      position: "bottom-right",
      title: "Responded",
      description: "Offer declined.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const transferItem = async privateKey => {
    setLoadingTransfer(true);

    try {
      // make request to blockchain to send vexcoins
      const bearerToken = await auth.currentUser.getIdToken(true);

      await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}transferItem`,
        data: {
          itemId: activeItem.itemId,
          fromPrivateKey: privateKey,
          toPublicKey: activeItem.toPublicKey,
          cost: activeItem.cost,
        },
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      // remove request from firestore
      deleteDoc(doc(db, "requests", activeItem.id));

      // update item in firestore
      updateDoc(doc(db, "items", activeItem.itemId), {
        currentOwner: activeItem.toPublicKey,
        ownerName: activeItem.toOwnerName,
        modifiedAt: new Date(),
        price: 0,
      });

      // adjust user balance
      dispatch.user.setBalance(activeItem.cost);

      // remove from UI
      setRequests(requests => requests.filter(el => el.id !== activeItem.id));
    } catch (error) {
      toast({
        position: "bottom-right",
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } finally {
      setLoadingTransfer(false);
    }

    toast({
      position: "bottom-right",
      title: "Success",
      description: "Offer accepted and transfer has been done.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loadingTransfer) return <GlobalLoading text={"Transfering item.."} />;

  return (
    <Stack>
      <SignTransaction
        isOpen={isOpen}
        onClose={onClose}
        callbackFunction={transferItem}
      />

      {!requests.length && <Text>No requests.</Text>}
      {requests.map(obj => (
        <Flex
          key={obj.itemId}
          borderWidth={1}
          borderRadius={25}
          p={5}
          justify="space-between"
        >
          {/* Item */}
          <Stack>
            <HStack>
              <Text fontSize={"2xl"}>{getItemCategoryIcon(obj.category)}</Text>
              <Text>{obj.name}</Text>
              <Text fontSize={"xs"}>
                <FaArrowRight />
              </Text>
              <Text>{obj.toOwnerName}</Text>
            </HStack>
            <Text fontSize={"xs"} color={secondaryColor}>
              {formatDistance(
                new Date(obj.requestedAt.seconds * 1000),
                new Date(),
                { addSuffix: true }
              )}
            </Text>
          </Stack>

          {/* Actions */}
          <HStack>
            <Text fontWeight={"bold"}>{formatNumber(obj.cost)} VX</Text>
            <Button
              onClick={() => {
                setActiveItem(obj);
                onOpen();
              }}
            >
              <FaCheck />
            </Button>
            <Button onClick={() => decline(obj.id)}>
              <FaTimes />
            </Button>
          </HStack>
        </Flex>
      ))}
    </Stack>
  );
};

export default Requests;
