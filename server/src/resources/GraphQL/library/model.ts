import mongoose, { Document, Schema } from "mongoose";
import { ILibrary } from "./types";
import Strategy from "@/graphql/strategy/model";

const librarySchema = new Schema<ILibrary>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    strategies: [{ type: Schema.Types.ObjectId, ref: "Strategy" }],
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

librarySchema.post<ILibrary>(
  "findOneAndDelete",
  { document: true, query: true },
  async function (doc: ILibrary | null) {
    try {
      // Remove all associated strategies when a library is deleted
      if (doc) await Strategy.deleteMany({ _id: { $in: doc.strategies } }); //select the documents where the value of the field is in the specified array
    } catch (error) {
      // next(error as any);
    }
  }
);

const Library = mongoose.model<ILibrary>("Library", librarySchema);

export default Library;
