// user.routes.js
import { Router } from "express";
import { loginUsers } from "../controllers/user.controller.js";

const router = Router();



router.route("/login").post(loginUsers)


export default router;
