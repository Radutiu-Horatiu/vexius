import React, { useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";

const GetPrivateKey = ({ isOpen, onClose, callbackFunction }) => {
  const privateKeyRef = useRef("");

  const confirm = () => {
    let privateKey = privateKeyRef.current.value;

    if (!privateKey) return;

    onClose();

    callbackFunction(privateKey);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Transaction</ModalHeader>
        <ModalBody>
          <VStack w={"100%"}>
            <Input placeholder="Private key" ref={privateKeyRef} />
            <Button onClick={confirm} w={"100%"}>
              Confirm
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GetPrivateKey;
