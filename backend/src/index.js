import dotenv from "dotenv";
dotenv.config({
  path: './.env' 
});

import connectDB from "./db/index.js";
import { app } from "./app.js";


console.log("env", process.env.MONGO_URI);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Connection promise end");
  });
 