import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { JWT_TOKEN_NAMESPACE } from "@/utils/globalConstants";
import CookieUtility from "@/utils/cookieUtils";
import { User } from "@/graphql/api";

interface AuthState {
  user: User | null;
  authToken: string | undefined | null;
}

const initialState: AuthState = {
  user: null,
  authToken: CookieUtility.getCookie(JWT_TOKEN_NAMESPACE),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      return { ...state, authToken: action.payload };
    },
  },
});

export const { setUserData, setAuthToken } = auth.actions;
export const authActions = auth.actions;

export default auth.reducer;
