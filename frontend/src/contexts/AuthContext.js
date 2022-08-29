import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc, getDocs, collection } from "@firebase/firestore";

import { db, auth } from "../firebase";
import { getUserBalance, getVexcoinData } from "../utils/helpers";

const AuthContext = React.createContext();

const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const isUserInitialized = useSelector(state => state.user.initialized);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(user);

  // get user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async res => {
      if (res) {
        // get userData from firestore
        const resp = await getDoc(doc(db, "users", res.uid));
        const userData = resp.data();

        // set user
        dispatch.user.setUser(userData);
      } else {
        dispatch.user.setUser(null);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get user balance and vexcoin data
  useEffect(() => {
    if (!isAuthenticated) return;

    (async () => {
      // set user balance
      const bearerToken = await auth.currentUser.getIdToken(true);

      const balance = await getUserBalance(user.publicKey, bearerToken);

      const vexcoinData = await getVexcoinData(bearerToken);

      dispatch.vexcoinData.setData(vexcoinData);
      dispatch.user.setBalance(balance);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // get home feed items
  useEffect(() => {
    (async () => {
      let allItems = await getDocs(collection(db, "items"));
      allItems = allItems.docs.map(doc => doc.data());
      dispatch.items.setData(allItems);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAuthenticated,
    isUserInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
