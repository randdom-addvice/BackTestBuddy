import CookieUtility from "@/utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
const JWT_TOKEN_NAMESPACE = "authToken";

export const checkTokenValidity = (
  authToken: string | undefined | null
): boolean => {
  if (!authToken || typeof authToken !== "string") return false;

  try {
    const decodedToken = jwtDecode(authToken);
    console.log(decodedToken);
    console.log();
    if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
      return true;
    } else {
      CookieUtility.deleteCookie(JWT_TOKEN_NAMESPACE);
      return false;
    }
  } catch (error) {
    return false;
  }
};
