import { Text } from "@chakra-ui/react";
import React from "react";

const Item = ({ obj }) => {
  return <Text>{obj.name}</Text>;
};

export default Item;
