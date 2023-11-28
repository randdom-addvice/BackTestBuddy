import mongoose, { Schema } from "mongoose";
import { IUser } from "./types";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    first_name: { type: String, required: true, default: "Anonymous" },
    last_name: { type: String, required: true, default: "Anonymous" },
    email_verified: { type: Boolean, default: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
