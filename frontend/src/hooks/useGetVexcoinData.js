import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";

const useGetVexcoinData = () => {
  const [vexcoinData, setVexcoinData] = useState(null);
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const bearerToken = await auth.currentUser.getIdToken(true);

      const response = await axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}getVexcoinData`,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      setVexcoinData(response.data);
    })();
  }, [user]);

  if (!vexcoinData) return "Loading..";

  return vexcoinData;
};

export default useGetVexcoinData;
