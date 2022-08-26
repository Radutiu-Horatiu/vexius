import { Button, Input, InputGroup } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

import { FaUpload } from "react-icons/fa";
import { VscFile } from "react-icons/vsc";

const UploadFile = ({ setDocument, document }) => {
  const [filename, setFilename] = useState("");
  const inputRef = useRef();

  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = e => {
    let file = e.target.files[0];
    if (!file) return;
    setFilename(file.name);

    getBase64(file)
      .then(result => {
        setDocument(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <InputGroup>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      ></input>
      <Input
        as={Button}
        leftIcon={document ? <VscFile /> : <FaUpload />}
        variant="solid"
        onClick={() => inputRef.current.click()}
      >
        {document ? filename : "Upload Picture"}
      </Input>
    </InputGroup>
  );
};

export default UploadFile;
