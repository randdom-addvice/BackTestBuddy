import { ApolloError } from "apollo-server";
import { GraphQLError } from "graphql";
import { csrfSync } from "csrf-sync";
import MongooseServices from "../services";
import UserModel from "./model";
import { IUser } from "./types";
import { Document } from "mongoose";
import {
  catchGraphQLError,
  throwGraphQLError,
} from "@/resources/services/errorHandler";
import {
  generateHash,
  generateToken,
  validPassword,
} from "@/resources/services/auth";

type RegisterUserInput = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const resolvers = {
  Query: {
    getUser: async (_: unknown, __: unknown, { user }: { user: IUser }) => {
      try {
        if (!user)
          throwGraphQLError(
            "FORBIDDEN",
            "You are not authorized to perform this action."
          );
        const foundUser = await MongooseServices.getEntity(UserModel, {
          _id: user._id,
        });
        return foundUser;
      } catch (error: any) {
        catchGraphQLError(error);
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: unknown,
      { registerUserInput }: { registerUserInput: RegisterUserInput }
    ) => {
      try {
        const isUserExist = await MongooseServices.getEntity(UserModel, {
          email: registerUserInput.email,
        });
        if (isUserExist) throwGraphQLError("FORBIDDEN", "Email already in use");

        const createdUser = await MongooseServices.createEntity(UserModel, {
          ...registerUserInput,
          password: generateHash(registerUserInput.password),
        } as Document<unknown, {}, IUser> & IUser);

        if (!createdUser)
          throwGraphQLError("FORBIDDEN", "Something went wrong");

        const token = generateToken(createdUser);
        return token;
      } catch (error: any) {
        if (error instanceof Error && error.name === "ValidationError") {
          throwGraphQLError("USER_INPUT_ERROR", "Invalid user input");
        }

        catchGraphQLError(error);
      }
    },
    loginUser: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await MongooseServices.getEntity(UserModel, { email });
        if (!user)
          return throwGraphQLError("FORBIDDEN", "Incorrect Email Or Password!");
        const checkValidPassword = validPassword(password, user.password);
        if (!checkValidPassword)
          return throwGraphQLError("FORBIDDEN", "Incorrect Email Or Password");

        const token = generateToken(user);
        return token;
      } catch (error: any) {
        catchGraphQLError(error);
      }
    },
  },
};

export default resolvers;
