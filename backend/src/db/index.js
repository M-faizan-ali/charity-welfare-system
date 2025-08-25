// import mongoose from "mongoose";
// import {DB_NAME} from "../constants.js"

import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const connectDB = async () => {
  try {
    console.log("---> mongo connection string", process.env.MONGO_URI);

    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MONGO DB CONNECTED  !! DB HOST :  ${connectionInstance.connection.host}`
    );
    console.log("mongo db connected successfully");
    // const newUser = await User.create({
    //   username: "Faizan Ali",
    //   email: "faizan@example.com",
    //   password: "$2a$12$ZPnrtIFLdz7VvBJqyhSB0e93bnieLqe5BUl73jS2ImN9WpRvS.LgS",
    //   userType: "admin",
    // });
  } catch (error) {
    console.log("ERROR WHILE CONNECTING DB", error);
    process.exit(1);
  }
};

export default connectDB;
