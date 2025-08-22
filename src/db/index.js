// import mongoose from "mongoose";
// import {DB_NAME} from "../constants.js"

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("---> mongo connection string", process.env.MONGO_URI);

    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI,
      // "mongodb://localhost:27017/backend"
    );
    console.log(
      `MONGO DB CONNECTED  !! DB HOST :  ${connectionInstance.connection.host}`,
    );
    console.log("mongo db connected successfully")
  } catch (error) {
    console.log("ERROR WHILE CONNECTING DB", error);
    process.exit(1);
  }
};

export default connectDB;
