import axios from "axios";

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
