import { Box, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Item from "../components/Item";
import GlobalLoading from "../components/GlobalLoading";
import Tutorial from "../components/Tutorial";

const Home = () => {
  const items = useSelector(state => state.items);
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTutorial(params.get("tutorial"));
  }, []);

  if (!items.initialized) return <GlobalLoading />;

  return (
    <Box>
      {tutorial && <Tutorial />}
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
