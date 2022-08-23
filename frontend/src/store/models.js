import { signOut } from "firebase/auth";
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
    async logout() {
      await signOut(auth).finally(() => this.setUser(null));
    },

    async signInWithProvider({ userData, uid, isNewUser }) {
      isNewUser && (await setDoc(doc(db, "users", uid), userData));
    },
  }),
};
