import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { connect } from "react-redux";
import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn = ({ signInWithProvider }) => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const googleSignIn = async () => {
    try {
      const responseFromAuth = await signInWithPopup(auth, provider);
      const isNewUser = responseFromAuth._tokenResponse?.isNewUser;
      const user = responseFromAuth.user;

      const userData = {
        email: user.email,
        fullName: user.displayName,
      };
      signInWithProvider({ userData, uid: user.uid, isNewUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={googleSignIn} w={"100%"} leftIcon={<FaGoogle />}>
      Sign In With Google
    </Button>
  );
};

const mapDispatch = dispatch => ({
  signInWithProvider: dispatch.user.signInWithProvider,
});

export default connect(null, mapDispatch)(GoogleSignIn);
