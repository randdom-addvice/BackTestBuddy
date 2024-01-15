import mongoose, { Document, Schema } from "mongoose";

interface ProFeaturesDocument extends Document {
  proName: string;
  features: string[];
  description: string;
  interval: string;
  plan_id: string;
  price: number;
  free_trial: boolean;
  active: boolean;
}

const proFeaturesSchema = new Schema<ProFeaturesDocument>(
  {
    proName: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    interval: {
      type: String,
    },
    plan_id: {
      type: String,
    },
    price: {
      type: Number,
    },
    free_trial: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

proFeaturesSchema.set("toObject", { virtuals: true });
proFeaturesSchema.set("toJSON", { virtuals: true });

const ProFeaturesModel = mongoose.model<ProFeaturesDocument>(
  "proFeatures",
  proFeaturesSchema
);

export { ProFeaturesModel, ProFeaturesDocument };
