import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import GlobalLoading from "../components/GlobalLoading";
import { auth, db } from "../firebase";
import { dec2hex, formatNumber, getItemCategoryIcon } from "../utils/helpers";

const ItemScreen = () => {
  let { id } = useParams();
  const [item, setItem] = useState(null);
  const secondaryColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const itemBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  // get item
  useEffect(() => {
    if (!id) return;

    (async () => {
      // get item from blockchain
      const bearerToken = await auth.currentUser.getIdToken(true);

      const response = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}getItem`,
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      // construct visible ownerHistory
      const ownerPublicKeys = response.data.ownerHistory.map(
        el => (el = dec2hex(el.ownerPublicKey))
      );

      let usersRef = collection(db, "users");
      const qUsers = query(usersRef, where("publicKey", "in", ownerPublicKeys));
      const querySnapshotUsers = await getDocs(qUsers);
      let userResults = querySnapshotUsers.docs.map(el => (el = el.data()));

      const ownerHistory = response.data.ownerHistory.map(
        el =>
          (el = {
            date: el.date,
            owner: userResults.find(
              user => user.publicKey === dec2hex(el.ownerPublicKey)
            ),
          })
      );

      // get item from firestore
      let item = await getDoc(doc(db, "items", id));

      setItem({
        ...response.data,
        ownerHistory,
        data: item.data(),
      });
    })();
  }, [id]);

  if (!item) return <GlobalLoading />;

  const buy = () => {};

  return (
    <Stack>
      <Flex align={"center"}>
        <Avatar name={item.data.ownerName} />
        <Box ml={2}>
          <Text>{item.data.ownerName}</Text>
          <Text color={secondaryColor} fontSize="xs">
            {item.data.currentOwner}
          </Text>
        </Box>
      </Flex>
      <Divider />
      <VStack
        h={"25vh"}
        justifyContent="center"
        bg={itemBgColor}
        borderRadius={25}
      >
        <Heading>{item.data.name}</Heading>
        <Text fontSize={"5xl"}>{getItemCategoryIcon(item.data.category)}</Text>
        <Text>{item.data.category}</Text>
        <Text fontSize={"sm"} color={secondaryColor} fontWeight="light">
          Registered on{" "}
          {new Date(item.data.addedAt.seconds * 1000).toLocaleDateString()}
        </Text>
      </VStack>
      <Button onClick={buy} leftIcon={<FaArrowRight />}>
        Buy For {formatNumber(item.data.price)} VX
      </Button>
      <Divider />
      <Heading fontSize={"lg"}>Item Owner History</Heading>
      {item.ownerHistory.map((obj, i) => (
        <Stack key={obj.owner.publicKey}>
          <Flex align={"center"}>
            <Text color={secondaryColor}>{i + 1}</Text>
            <Avatar name={obj.owner.fullName} ml={2} src={obj.owner.picture} />
            <Box ml={2}>
              <Text>
                {obj.owner.fullName}{" "}
                <chakra.span color={secondaryColor} fontSize="xs">
                  @{obj.owner.publicKey}
                </chakra.span>
              </Text>
              <Text fontSize="lg">
                {new Date(obj.date * 1000).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};

export default ItemScreen;
