import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";

import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { useAuth } from "../contexts/AuthContext";

const MotionButton = motion(Button);

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Heading>The Best React Boilerplate Ever!</Heading>
          <HStack spacing={10}>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
            <Link
              color="teal.500"
              href="https://firebase.google.com/"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Firebase
            </Link>
            <Link
              color="teal.500"
              href="https://rematchjs.org/"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Rematch
            </Link>
          </HStack>
          <HStack>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              as={ReactRouterLink}
              to="/login"
            >
              Login
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              as={ReactRouterLink}
              to="/register"
            >
              Register
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              as={ReactRouterLink}
              to="/protected"
            >
              Protected Route
            </MotionButton>
          </HStack>
          {isAuthenticated && (
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              onClick={() => dispatch.user.logout()}
            >
              Logout
            </MotionButton>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default Home;
