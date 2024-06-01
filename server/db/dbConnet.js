import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_CONNECT_KEY = process.env.DB_KEY;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_CONNECT_KEY);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("ERROR CONNECTING DB", error);
  }
};

export { dbConnect };
