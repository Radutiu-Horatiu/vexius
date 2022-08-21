import React from 'react';
import { Center } from '@chakra-ui/layout';
import { Lottie } from '@crello/react-lottie';

import animationData from '../assets/lotties/404.json';

const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const PageNotFound = () => {
  return (
    <Center h="100vh" w="100vw">
      <Lottie config={defaultLottieOptions} height={400} width={400} />
    </Center>
  );
};

export default PageNotFound;
