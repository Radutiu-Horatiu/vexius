import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";

import { db, auth } from "../firebase";
import { emptyFn } from "../utils/helpers";
import useGetUserBalance from "../hooks/useGetUserBalance";

const AuthContext = React.createContext();

const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const user = useSelector(state => state.user.value);
  const isUserInitialized = useSelector(state => state.user.initialized);
  const dispatch = useDispatch();
  const location = useLocation();
  const balance = useGetUserBalance();

  const isAuthenticated = Boolean(user);

  React.useEffect(() => {
    let unsubscribeUsersCollection = emptyFn;
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        unsubscribeUsersCollection = onSnapshot(
          doc(db, "users", user.uid),
          doc => {
            let data = doc.data();
            dispatch.user.setUser(data);
            dispatch.user.setBalance(balance);
          }
        );
      } else {
        dispatch.user.setUser(null);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeUsersCollection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, balance]);

  React.useEffect(() => {
    if (location?.state?.from?.pathname) {
      localStorage.setItem(
        "redirectWhereCameFrom",
        location?.state?.from?.pathname
      );
    }

    return () => {
      if (!["/login"].includes(location.pathname)) {
        localStorage.removeItem("redirectWhereCameFrom");
      }
    };
  }, [location]);

  const value = {
    isAuthenticated,
    isUserInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
