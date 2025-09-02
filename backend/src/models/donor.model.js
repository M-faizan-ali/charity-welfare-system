import mongoose, { Schema } from "mongoose";

const donorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required:true
    },
    address: {
      type: String,
      required: true,
    },
    donorImage: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true,
    },
    purpose: {
      type: String,
      enum: ["education", "health", "orphans", "general", "funeral"],
      required:true
    },
    status: {
      type: String,
      enum: ["completed", "refunded"],
    },
    amount: {
      type: String,
      required: true,
    },
    donationDate: {
      type: Date,
      required: true,
    },
    whatsApp:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

export const Donor = mongoose.model("Donor", donorSchema);
