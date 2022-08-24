import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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
  }),
};
