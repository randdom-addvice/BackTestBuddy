import jwt from "jsonwebtoken";
import { IUser } from "@/graphql/user/types";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  user: IUser;
}

const getUserFromToken = (token: string | null): any | null => {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const user = decoded.user;

    return user;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export default getUserFromToken;
