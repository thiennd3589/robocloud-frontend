import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");
const currentUser = Cookies.get("currentUser");

const initialState = {
  accessToken,
  currentUser: currentUser ? JSON.parse(currentUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
    setCurrentUser(state, { payload }) {
      state.currentUser = payload;
    },
    removeAuth(state) {
      state.accessToken = undefined;
      state.currentUser = undefined;
    },
  },
});

export const { setAccessToken, setCurrentUser, removeAuth } = authSlice.actions;

export default authSlice.reducer;
