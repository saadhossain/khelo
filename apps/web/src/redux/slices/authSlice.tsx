import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";

interface AuthSlice {
  user: UserType | null;
  loading: boolean;
}
const initialState = {
  user: null,
  loading: true,
} as AuthSlice;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload.user;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      localStorage.removeItem("gamifyToken");
    },
    setLoading: (state) => {
      state.loading = false;
    },
    setUpdatedUser: (state, actions) => {
      state.user = actions.payload
      state.loading = false
    }
  },
});

export const { login, logout, setLoading, setUpdatedUser } = authSlice.actions;

export default authSlice.reducer;
