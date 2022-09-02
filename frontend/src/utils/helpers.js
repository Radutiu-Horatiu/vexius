import axios from "axios";
import {
  FaCar,
  FaClock,
  FaMagic,
  FaRing,
  FaShoePrints,
  FaShoppingBag,
  FaStar,
  FaTshirt,
  FaWineBottle,
} from "react-icons/fa";

export const getUserBalance = async (publicKey, bearerToken) => {
  const response = await axios.request({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}getBalance`,
    data: {
      publicKey: publicKey,
    },
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return response.data;
};

export const getVexcoinData = async bearerToken => {
  const response = await axios.request({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}getVexcoinData`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return response.data;
};

export const formatNumber = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getItemCategoryIcon = type => {
  const itemMap = {
    Watches: <FaClock />,
    Jewelry: <FaRing />,
    Clothing: <FaTshirt />,
    Shoes: <FaShoePrints />,
    Handbags: <FaShoppingBag />,
    Accessories: <FaMagic />,
    Beauty: <FaStar />,
    Automobiles: <FaCar />,
    "Fine Wines": <FaWineBottle />,
  };

  return itemMap[type];
};
