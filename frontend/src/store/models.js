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

export const vexcoinData = {
  state: {
    total_users: 0,
    vexcoin_amount: 0,
    initialized: false,
  },

  reducers: {
    setData(state, payload) {
      if (!state.initialized) {
        state.initialized = true;
      }

      return {
        ...state,
        total_users: payload.total_users,
        vexcoin_amount: payload.vexcoin_amount,
      };
    },
  },
};
