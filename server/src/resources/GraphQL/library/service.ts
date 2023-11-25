import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ILibrary } from "./types";
import LibraryModel from "./model";

class LibraryService {
  // MONGOOSE SERVICES
  public static async getLibraries(
    query: FilterQuery<ILibrary>,
    options: QueryOptions = { lean: true }
  ): Promise<ILibrary[]> {
    return await LibraryModel.find(query, {}, options);
  }

  public static async getLibrary(
    query: FilterQuery<ILibrary>,
    options: QueryOptions = { lean: true }
  ): Promise<ILibrary | null> {
    return await LibraryModel.findOne(query, {}, options);
  }

  public static async createLibrary(input: ILibrary): Promise<ILibrary> {
    return await LibraryModel.create(input);
  }

  public static async findAndUpdate(
    query: FilterQuery<ILibrary>,
    update: UpdateQuery<ILibrary>,
    options?: QueryOptions
  ): Promise<ILibrary | null> {
    // console.log(update);
    return await LibraryModel.findOneAndUpdate(
      query,
      // { $set: update },
      update,
      options
    );
  }

  public static async deleteLibrary(
    query: FilterQuery<ILibrary>
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const t = await LibraryModel.deleteOne(query);
    return t;
  }
}

export default LibraryService;
