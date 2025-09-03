import { Router } from "express";
import { registerDonors } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "donorImage",
            maxCount: 1
        }
    ]),
    registerDonors
    )

export default router