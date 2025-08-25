import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";

// const loginUser = asyncHandler(async (req, res) => {
//   // req body -> data
//   // username or email
//   //find the user
//   //password check
//   //access and referesh token
//   //send cookie

//   const { username, password } = req.body;
//   console.log(email);

//   if (!username) {
//     throw new ApiError(400, "username or email is required");
//   }

//   const user = await User.findOne({ username });

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
//     user._id
//   );

//   const loggedInUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "User logged In Successfully"
//       )
//     );
// });

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

export { loginUsers };
