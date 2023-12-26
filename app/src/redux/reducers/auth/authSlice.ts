import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../graphql/api";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUserData } = auth.actions;

export default auth.reducer;
