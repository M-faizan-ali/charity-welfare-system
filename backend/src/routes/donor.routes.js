import { Router } from "express";
import { registerDonors } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/donor-form").post(registerDonors)
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