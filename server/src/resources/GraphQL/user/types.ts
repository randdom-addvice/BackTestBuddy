// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { ILibrary } from "@/graphql/library/types";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  // libraries: Schema.Types.ObjectId[] | ILibrary[];
}
