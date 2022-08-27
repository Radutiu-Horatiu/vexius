import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";

const useGetUserBalance = () => {
  const [userBalance, setUserBalance] = useState(0);
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const bearerToken = await auth.currentUser.getIdToken(true);

      const response = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}getBalance`,
        data: {
          publicKey: user.publicKey,
        },
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      setUserBalance(response.data);
    })();
  }, [user]);

  return userBalance;
};

export default useGetUserBalance;
