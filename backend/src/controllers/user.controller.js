import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";

const registerDonors = asyncHandler(async (req, res) => {});

const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "email and password is required");
  }
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email and password");
  }

  const matchPassword = await user.isPasswordCorrect(password);
  console.log(matchPassword);
  if (!matchPassword) {
    throw new ApiError(401, "Invalid email and passowrd");
  }

  res.status(200).json("Login Successfully");
});

export { loginUsers, registerDonors };
