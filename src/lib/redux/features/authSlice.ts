import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const initialState: IAuth = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      console.log("CHECK ACTION SIGNIN", action);
      return action.payload;
    },
    setSignOut: (state) => {
      return initialState;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

export default authSlice.reducer;
