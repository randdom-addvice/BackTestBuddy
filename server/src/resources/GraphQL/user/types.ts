import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  email_verified: boolean;
}
