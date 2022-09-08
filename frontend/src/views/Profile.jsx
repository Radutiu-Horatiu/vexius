import {
  Avatar,
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../components/Item";
import { db } from "../firebase";

const Profile = () => {
  const user = useSelector(state => state.user.value);
  const [items, setItems] = useState([]);
  const secondaryColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");

  // get inventory
  useEffect(() => {
    if (!user) return;

    (async () => {
      let ref = collection(db, "items");
      const q = query(ref, where("currentOwner", "==", user.publicKey));
      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs
        .map(el => (el = el.data()))
        .sort((a, b) => (a.modifiedAt.seconds < b.modifiedAt.seconds ? 1 : -1));

      setItems(items);
    })();
  }, [user]);

  return (
    <Stack>
      {/* Header */}
      <Stack borderBottomWidth={1} p={3}>
        <Avatar
          src={user.picture}
          name={user.fullName}
          size="xl"
          borderWidth={1}
        />
        <Box>
          <Heading fontSize={"xl"}>{user.fullName}</Heading>
          <Text fontSize={"sm"}>{user.email}</Text>
          <Text color={secondaryColor} fontSize="sm">
            Joined{" "}
            {formatDistance(new Date(user.joined.seconds * 1000), new Date(), {
              addSuffix: true,
            })}
          </Text>
        </Box>
      </Stack>

      {/* Inventory */}
      <Stack>
        <Heading fontSize={"lg"} p={3}>
          Inventory
        </Heading>
        {items.map(item => (
          <Item obj={item} key={item.id} />
        ))}
        {!items.length && <Text pl={3}>No items.</Text>}
      </Stack>
    </Stack>
  );
};

export default Profile;
