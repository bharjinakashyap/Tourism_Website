import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotelname: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    gstnumber: {
      type: String,
      required: true,
      unique: true,
    },
    tradelicense: {
      type: Number,
      required: true,
      unique: true,
    },
    keypass: {
      type: String,
    },
    role: {
      type: String,
      default: "hotelier",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
