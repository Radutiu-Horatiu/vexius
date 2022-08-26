import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";

const CreateItem = () => {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");
  const [imageSrc, setImageSrc] = useState(null);

  const createItem = () => {
    let name = nameRef.current.value;
    let price = priceRef.current.value;
    let description = descriptionRef.current.value;

    if (!name || !price || !description || !imageSrc) return;
  };

  return (
    <Box>
      <VStack w={"50vw"}>
        <Heading>Create Item</Heading>
        <Input placeholder="Name" ref={nameRef} />
        <Input placeholder="How much $" ref={priceRef} />
        <Input placeholder="Description" ref={descriptionRef} />
        {imageSrc ? (
          <Image src={imageSrc} h="30vh" borderRadius={5} objectFit="contain" />
        ) : (
          <UploadFile document={imageSrc} setDocument={setImageSrc} />
        )}

        <Button w="100%" onClick={createItem}>
          Create
        </Button>
        <Button
          leftIcon={<FaArrowLeft />}
          w="100%"
          onClick={() => navigate("/")}
        >
          Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateItem;
