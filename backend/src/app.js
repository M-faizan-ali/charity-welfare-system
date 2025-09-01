import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
    origin: "*"
    // credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    limit:"16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


//routes declaration
app.use("/api/v1/users", userRouter);


export { app };
