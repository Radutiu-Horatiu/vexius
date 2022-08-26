import {
  Box,
  Button,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const priceRef = useRef("");
  const [category, setCategory] = useState(null);

  const createItem = () => {
    let name = nameRef.current.value;
    let price = priceRef.current.value;

    if (!name || !price || !category) return;
  };

  return (
    <Box>
      <VStack w={"50vw"}>
        <Heading>Create Item</Heading>
        <Input placeholder="Name" ref={nameRef} />
        <Input placeholder="How much $" ref={priceRef} />
        <RadioGroup onChange={setCategory} value={category}>
          <Stack>
            <Radio value="Watch">Watch</Radio>
            <Radio value="Jewelry">Jewelry</Radio>
            <Radio value="Clothing">Clothing</Radio>
            <Radio value="Shoe">Shoe</Radio>
            <Radio value="Handbag">Handbag</Radio>
            <Radio value="Accessory">Accessory</Radio>
            <Radio value="Beauty">Beauty</Radio>
            <Radio value="Automobile">Automobile</Radio>
            <Radio value="Fine Wine">Fine Wine</Radio>
          </Stack>
        </RadioGroup>
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
