import React from "react";
import { useParams } from "react-router-dom";

const ItemScreen = () => {
  let { id } = useParams();

  return <div>ItemScreen: {id}</div>;
};

export default ItemScreen;
