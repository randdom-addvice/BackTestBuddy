import { Document, Schema } from "mongoose";
import { IStrategy } from "../strategy/types";
import { IUser } from "@/graphql/user/types";

export interface ILibrary extends Document {
  _id?: string | Schema.Types.ObjectId;
  name: string;
  description: string;
  strategies: Schema.Types.ObjectId[] | IStrategy[];
  user_id: Schema.Types.ObjectId | string;
}

export interface GraphQLContext {
  user: IUser;
  token?: String;
}

export interface GraphQLResolverArgs {
  [key: string]: any;
}
