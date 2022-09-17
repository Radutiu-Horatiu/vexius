import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const Tutorial = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColorContent = useColorModeValue("white", "black");
  const bgColorOverlay = useColorModeValue("blackAlpha.300", "whiteAlpha.200");

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
      <ModalOverlay bg={bgColorOverlay} />
      <ModalContent bg={bgColorContent}>
        <ModalHeader fontWeight={"light"}>VEXIUS</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tutorial</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Tutorial;
