import React, { useState, useEffect } from "react";
import CookieUtility from "../../utils/cookieUtils";

const JWT_TOKEN_NAMESPACE = "authToken";
const useAuthTokens = () => {
  const [authToken, setAuthToken] = useState<string | null | undefined>(null);

  useEffect(() => {
    setAuthToken(CookieUtility.getCookie(JWT_TOKEN_NAMESPACE));
    return () => {};
  }, []);

  function setAuthCookies(token: string) {
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000 * 24);
    setAuthToken(token);
    CookieUtility.setCookie(JWT_TOKEN_NAMESPACE, token, {
      expires: expirationTime,
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  }

  return { authToken, setAuthCookies };
};

export default useAuthTokens;
