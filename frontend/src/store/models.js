import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

export const user = {
  state: {
    value: null,
    initialized: false,
  },

  reducers: {
    setUser(state, payload) {
      if (!state.initialized) {
        state.initialized = true;
      }

      return { ...state, value: payload };
    },
  },

  effects: dispatch => ({
    // async exampleAsyncFunction(payload, rootState) {
    //   rootState contains all the states from the whole app
    //   dispatch.anotherModel.setFunction(payload); - dispatch reducer/effect from an external state
    //   this.setFunction(payload); - dispatch reducer/effect from current state
    // },

    async logout() {
      await signOut(auth).finally(() => this.setUser(null));
    },

    async registerWithEmailAndPassword({ email, name, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUserData = {
        email: response.user.providerData[0].email,
        username: name,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", response.user.uid), newUserData);
    },

    async loginWithEmailAndPassword({ email, password }) {
      await signInWithEmailAndPassword(auth, email, password);
    },
  }),
};
