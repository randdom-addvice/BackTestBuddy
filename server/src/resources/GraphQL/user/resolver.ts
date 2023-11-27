import { ApolloError } from "apollo-server";
import MongooseServices from "../services";
import UserModel from "./model";
import { IUser } from "./types";

import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    getUser: async (_: any, args: unknown, { user }: { user: IUser }) => {
      try {
        if (!user)
          throw new GraphQLError(
            "You are not authorized to perform this action.",
            {
              extensions: {
                code: "FORBIDDEN",
              },
            }
          );

        if (user) {
          const foundUser = await MongooseServices.getEntity(UserModel, {
            _id: user._id,
          });
          return foundUser;
        }
      } catch (error) {
        throw new ApolloError(
          "Internal server error. something went wrong",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};

export default resolvers;
