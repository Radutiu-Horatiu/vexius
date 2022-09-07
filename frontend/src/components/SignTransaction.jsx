import React, { useRef } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

const GetPrivateKey = ({ isOpen, onClose, callbackFunction }) => {
  const privateKeyRef = useRef("");
  const bgColorContent = useColorModeValue("white", "black");
  const bgColorOverlay = useColorModeValue("blackAlpha.300", "whiteAlpha.200");

  const confirm = () => {
    let privateKey = privateKeyRef.current.value;

    if (!privateKey) return;

    onClose();

    callbackFunction(privateKey);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg={bgColorOverlay} />
      <ModalContent bg={bgColorContent} p={10}>
        <ModalHeader>Sign Transaction</ModalHeader>
        <ModalBody>
          <Flex>
            <VStack w={"100%"}>
              <Input placeholder="Private key" ref={privateKeyRef} />
              <Button onClick={confirm} w={"100%"} leftIcon={<FaCheck />}>
                Confirm
              </Button>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GetPrivateKey;
