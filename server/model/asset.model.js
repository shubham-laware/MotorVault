import mongoose, { Schema } from "mongoose";

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    motorID: {
      type: String,
      required: true,
    },

    manufacturer: {
      type: String,
      required: true,
    },

    modelNo: {
      type: String,
      required: true,
    },

    serialNo: {
      type: String,
      required: true,
    },

    installationDate: {
      type: String,
      required: true,
    },

    maintainenceDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    power: {
      type: String,
      required: true,
    },

    voltage: {
      type: String,
      required: true,
    },

    current: {
      type: String,
      required: true,
    },

    speed: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Asset = mongoose.model("Asset", assetSchema);
