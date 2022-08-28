import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const user = {
  state: {
    value: null,
    initialized: false,
    balance: 0,
  },

  reducers: {
    setUser(state, payload) {
      if (!state.initialized) {
        state.initialized = true;
      }

      return { ...state, value: payload };
    },
    setBalance(state, payload) {
      return { ...state, balance: parseInt(state.balance) + parseInt(payload) };
    },
  },

  effects: dispatch => ({
    async logout() {
      await signOut(auth).finally(() => this.setUser(null));
    },
  }),
};
