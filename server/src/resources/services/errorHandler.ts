import { ApolloError } from "apollo-server";
import mongoose from "mongoose";

export function throwGraphQLError(code: string, message: string) {
  throw new ApolloError(message, code);
  //   throw new GraphQLError(message, {
  //     extensions: {
  //       code: code,
  //     },
  //   });
}

export function catchGraphQLError(error: any) {
  console.log(error);
  if (error instanceof Error && error.name === "ValidationError") {
    throwGraphQLError("USER_INPUT_ERROR", "Invalid user input");
  }
  if (error instanceof mongoose.Error.CastError) {
    throwGraphQLError("USER_INPUT_ERROR", "Invalid ID format");
  }
  const message =
    error?.message ??
    "Internal server error. something went wrong, make sure to fill every required field correctl";

  const code = error?.extensions.code ?? "INTERNAL_SERVER_ERROR";
  throwGraphQLError(code, message);
}
