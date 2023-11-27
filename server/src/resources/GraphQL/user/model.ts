// src/models/User.ts
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./types";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // libraries: [{ type: Schema.Types.ObjectId, ref: "Library" }],
});

userSchema.methods.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function (password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
