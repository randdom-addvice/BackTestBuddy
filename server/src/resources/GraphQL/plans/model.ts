import mongoose, { Document, Schema, Types } from "mongoose";

enum Interval {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

interface ProDocument extends Document {
  user: Types.ObjectId;
  proplan: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  interval: Interval;
  active: boolean;
  duration: number;
  payment_cancel: boolean;
}

const proSchema = new Schema<ProDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    proplan: {
      type: Schema.Types.ObjectId,
      ref: "proFeatures",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    interval: {
      type: String,
      enum: ["MONTHLY", "YEARLY"], // monthly, yearly
    },
    active: {
      type: Boolean,
    },
    duration: {
      type: Number,
    },
    payment_cancel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

proSchema.set("toObject", { virtuals: true });
proSchema.set("toJSON", { virtuals: true });

const ProModel = mongoose.model<ProDocument>("pro", proSchema);

export { ProModel, ProDocument };
