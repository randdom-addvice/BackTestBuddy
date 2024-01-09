import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "@/graphql/user/types";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  user: IUser;
}

export const getUserFromToken = (
  token: string | null | undefined
): any | null => {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    // console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export function generateCSRFToken(): string {
  const array = new Uint32Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export const generateHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const validPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
