import React from "react";
import { Lottie } from "@crello/react-lottie";
import { Box } from "@chakra-ui/react";

import animationData from "../assets/lotties/404.json";

const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PageNotFound = () => {
  return (
    <Box>
      <Lottie config={defaultLottieOptions} height={400} width={400} />
    </Box>
  );
};

export default PageNotFound;
