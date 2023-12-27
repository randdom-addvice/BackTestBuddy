import React, { useState, useEffect } from "react";
import CookieUtility from "@/utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { authActions } from "@/redux/reducers/auth/authSlice";

const JWT_TOKEN_NAMESPACE = "authToken";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [authToken, setAuthToken] = useState<string | null | undefined>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    setAuthToken(CookieUtility.getCookie(JWT_TOKEN_NAMESPACE));
    return () => {};
  }, []);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!authToken) {
        setIsTokenValid(false);
        return;
      }
      try {
        const decodedToken = jwtDecode(authToken);

        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setIsTokenValid(true);
          dispatch(authActions.setAuthToken(authToken));
        } else {
          CookieUtility.deleteCookie(JWT_TOKEN_NAMESPACE);
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        setIsTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [authToken]);

  function setAuthCookies(token: string) {
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000 * 24);
    setAuthToken(token);
    dispatch(authActions.setAuthToken(token));
    CookieUtility.setCookie(JWT_TOKEN_NAMESPACE, token, {
      expires: expirationTime,
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
    console.log("Set all tokens");
  }

  return { authToken, setAuthCookies };
};

export default useAuth;
