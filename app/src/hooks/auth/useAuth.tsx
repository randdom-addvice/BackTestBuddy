import React, { useState, useEffect } from "react";
import CookieUtility from "../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";

const JWT_TOKEN_NAMESPACE = "authToken";

const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null | undefined>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    setAuthToken(CookieUtility.getCookie(JWT_TOKEN_NAMESPACE));
    return () => {};
  }, []);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (authToken) {
        try {
          const decodedToken = jwtDecode(authToken);
          console.log(decodedToken);
          if (decodedToken.exp) {
            const isTokenStillValid = decodedToken.exp * 1000 > Date.now();
            CookieUtility.deleteCookie(JWT_TOKEN_NAMESPACE);
            console.log("jwt token valid? ", isTokenStillValid);
            setIsTokenValid(isTokenStillValid);
          }
        } catch (error) {
          console.error("Error decoding JWT:", error);
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [authToken]);

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

export default useAuth;
