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

export const dec2hex = str => {
  var dec = str.toString().split(""),
    sum = [],
    hex = [],
    i,
    s;

  while (dec.length) {
    s = 1 * dec.shift();
    for (i = 0; s || i < sum.length; i++) {
      s += (sum[i] || 0) * 10;
      sum[i] = s % 16;
      s = (s - sum[i]) / 16;
    }
  }

  while (sum.length) hex.push(sum.pop().toString(16));

  let result = hex.join("");

  while (result.length !== 40) result = "0" + result;

  return "0x" + result;
};
