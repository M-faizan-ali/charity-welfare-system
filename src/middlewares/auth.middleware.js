import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // get token from frontend
  // if  token not found throw error
  // match token from database
  // get the user of existing token
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );
  
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
  
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token")
  }
});
