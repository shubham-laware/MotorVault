import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    ticketID: {
      type: String,
      required: true,
    },

    assetID: {
      type: String,
      required: true,
    },

    issue: {
      type: String,
      required: true,
    },

    dateRaised: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
