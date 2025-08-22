// user.routes.js
import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

console.log("inside users routes");

// Example register route (commented in your code)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/referesh-token").post(refreshAccessToken)

export default router;
