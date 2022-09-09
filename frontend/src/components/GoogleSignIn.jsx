import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import GlobalLoading from "./GlobalLoading";

const GoogleSignIn = props => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const responseFromAuth = await signInWithPopup(auth, provider);
      const isNewUser = responseFromAuth._tokenResponse?.isNewUser;
      const user = responseFromAuth.user;

      if (isNewUser) {
        setLoadingText("Saving on blockchain..");

        // make call to register user on blockchain
        const bearerToken = await auth.currentUser.getIdToken(true);

        const response = await axios.request({
          method: "POST",
          url: `${process.env.REACT_APP_BACKEND_URL}addNewUser`,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        let userData = {
          email: user.email,
          fullName: user.displayName,
          publicKey: response.data.publicKey.toLowerCase(),
          picture: user.photoURL,
          uid: user.uid,
          joined: new Date(),
        };

        dispatch.user.setUser(userData);

        // save user to firestore
        setDoc(doc(db, "users", user.uid), userData);

        // go to success page to copy private key and create account
        navigate("/success", {
          state: {
            privateKey: response.data.privateKey,
          },
        });
      } else {
        // get userData from firestore
        const userData = await getDoc(doc(db, "users", user.uid));

        // set user
        dispatch.user.setUser(userData.data());

        // go home
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  return (
    <>
      {loading && <GlobalLoading text={loadingText} />}
      <Button
        onClick={googleSignIn}
        w={"100%"}
        leftIcon={<FaGoogle />}
        {...props}
      >
        Login
      </Button>
    </>
  );
};

export default GoogleSignIn;
