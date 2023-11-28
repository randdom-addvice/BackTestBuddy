import {
  catchGraphQLError,
  throwGraphQLError,
} from "@/resources/services/errorHandler";
import MongooseServices from "../services";
import { IUser } from "../user/types";
import LibraryModel from "./model";
import { ILibrary } from "./types";

const libraryResolvers = {
  Query: {
    getLibraries: async (
      _: unknown,
      __: unknown,
      { user }: { user?: IUser }
    ) => {
      try {
        if (!user)
          return throwGraphQLError(
            "FORBIDDEN",
            "You are not authorized to perform this action."
          );
        const libraries = await MongooseServices.getEntities(
          LibraryModel,
          {
            user_id: user._id,
          },
          "strategies"
        );
        return libraries;
      } catch (error) {
        catchGraphQLError(error);
      }
    },
  },
  Mutation: {
    createLibrary: async (
      _: any,
      {
        createLibraryInput,
      }: { createLibraryInput: Pick<ILibrary, "name" | "description"> },
      { user }: { user: IUser }
    ) => {
      try {
        if (!user)
          throwGraphQLError(
            "FORBIDDEN",
            "You are not authorized to perform this action."
          );
        const createdLibrary = await MongooseServices.createEntity(
          LibraryModel,
          {
            ...createLibraryInput,
            user_id: user._id,
          } as never as ILibrary
        );
        if (!createdLibrary) return false;
        return true;
      } catch (error: any) {
        catchGraphQLError(error);
      }
    },
    modifyLibrary: async (
      _: any,
      {
        modifyLibraryInput: { name, description, library_id },
      }: {
        modifyLibraryInput: {
          name?: string;
          description?: string;
          library_id: string;
        };
      },
      { user }: { user: IUser }
    ) => {
      try {
        if (!user)
          throwGraphQLError(
            "FORBIDDEN",
            "You are not authorized to perform this action."
          );
        const query = {
          user_id: user._id,
          _id: library_id,
        };
        const libraryToUpdate = await MongooseServices.getEntity(
          LibraryModel,
          query
        );
        await MongooseServices.findAndUpdate(LibraryModel, query, {
          $set: {
            name: name ?? libraryToUpdate?.name,
            description: description ?? libraryToUpdate?.description,
          },
        });
        return true;
      } catch (error) {
        catchGraphQLError(error);
      }
    },
    deleteLibrary: async (_: any, { id }: { id: string }) => {
      try {
        const deleteSuccess = await MongooseServices.deleteEntity(
          LibraryModel,
          { _id: id }
        );
        if (!deleteSuccess) return false;
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default libraryResolvers;
