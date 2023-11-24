import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ILibrary } from "./types";
import LibraryModel from "./model";

class DirectoryService {
  // MONGOOSE SERVICES
  public async getLibraries(
    query: FilterQuery<ILibrary>,
    options: QueryOptions = { lean: true }
  ): Promise<ILibrary[]> {
    return await LibraryModel.find(query, {}, options);
  }

  public async getLibrary(
    query: FilterQuery<ILibrary>,
    options: QueryOptions = { lean: true }
  ): Promise<ILibrary | null> {
    return await LibraryModel.findOne(query, {}, options);
  }

  public async createLibrary(input: ILibrary): Promise<ILibrary> {
    return await LibraryModel.create(input);
  }

  public async findAndUpdate(
    query: FilterQuery<ILibrary>,
    update: UpdateQuery<ILibrary>,
    options?: QueryOptions
  ): Promise<ILibrary | null> {
    return await LibraryModel.findOneAndUpdate(query, update, options);
  }

  public async deleteLibrary(
    query: FilterQuery<ILibrary>
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const t = await LibraryModel.deleteOne(query);
    return t;
  }
}

export default DirectoryService;
