// src/models/Library.ts
import mongoose, { Document, Schema } from "mongoose";
import { ILibrary } from "./types";

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

const Library = mongoose.model<ILibrary>("Library", librarySchema);

export default Library;
