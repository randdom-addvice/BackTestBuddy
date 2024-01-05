import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Library from "./library/model";
import { ILibrary } from "./library/types";
// import { ILibrary } from "./types";
// import LibraryModel from "./model";

class MongooseServices {
  public static async getEntities<T>(
    model: Model<T>,
    query: FilterQuery<T>,
    options: QueryOptions = { lean: true },
    fieldToPopulate: string = ""
  ): Promise<T[]> {
    const queryBuilder = model.find(query, {}, options);

    if (fieldToPopulate) queryBuilder.populate(fieldToPopulate);

    const result = await queryBuilder.exec();
    return result;
  }

  public static async getEntity<T>(
    model: Model<T>,
    query: FilterQuery<ILibrary>,
    options: QueryOptions = { lean: true }, //Note: setting this true, you would't be able to use .save() methods on the retreieved object
    fieldToPopulate?: string
  ): Promise<T | null> {
    const queryBuilder = model.findOne(query, {}, options);

    if (fieldToPopulate) queryBuilder.populate(fieldToPopulate);

    const result = await queryBuilder.exec();
    return result as T | null;
  }

  public static async createEntity<T>(model: Model<T>, input: T): Promise<T> {
    return await model.create(input);
  }

  public static async findAndUpdate<T>(
    model: Model<T>,
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T | null> {
    return await model.findOneAndUpdate(query, update, options);
    // return await model.findOneAndUpdate(query, { $set: update }, options);
  }

  public static async deleteEntity<T>(
    model: Model<T>,
    query: FilterQuery<T>
  ): Promise<T | null> {
    const t = await model.findOneAndDelete(query);
    return t;
  }
}

export default MongooseServices;
