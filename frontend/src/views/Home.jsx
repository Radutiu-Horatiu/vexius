import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import Item from "../components/Item";
import GlobalLoading from "../components/GlobalLoading";

const Home = () => {
  const items = useSelector(state => state.items);

  if (!items.initialized) return <GlobalLoading />;

  return (
    <Box>
      <VStack>
        {items.data
          .sort((a, b) =>
            a.modifiedAt.seconds < b.modifiedAt.seconds ? 1 : -1
          )
          .map(item => (
            <Item obj={item} key={item.id} />
          ))}
      </VStack>
    </Box>
  );
};

export default Home;
