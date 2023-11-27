import MongooseServices from "../services";
import LibraryModel from "./model";
import { ILibrary } from "./types";

const libraryResolvers = {
  Query: {
    getLibraries: async () => {
      const libraries = await MongooseServices.getEntities(
        LibraryModel,
        {
          user_id: "656287e350ac7fb861957c42",
        },
        "strategies"
      );
      return libraries;
    },
  },
  Mutation: {
    createLibrary: async (
      _: any,
      {
        createLibraryInput,
      }: { createLibraryInput: Pick<ILibrary, "name" | "description"> }
    ) => {
      try {
        const user_id = "656353bf5da794ccd711cf17";
        const createdLibrary = await MongooseServices.createEntity(
          LibraryModel,
          {
            ...createLibraryInput,
            user_id,
          } as never as ILibrary
        );
        if (!createdLibrary) return false;
        return true;
      } catch (error) {
        return false;
      }
    },
    modifyLibrary: async (
      _: any,
      {
        modifyLibraryInput: { name, description },
      }: { modifyLibraryInput: { name?: string; description?: string } }
    ) => {
      try {
        const query = {
          user_id: "656287e350ac7fb861957c42",
          _id: "656287e350ac7fb861957c46",
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
        return false;
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
