import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Donor } from "../models/donor.model.js";

const registerDonors = asyncHandler(async (req, res) => {
  const {
    fullName,
    country,
    address,
    email,
    purpose,
    status,
    amount,
    donationDate,
    whatsApp,
  } = req.body;

  if ([fullName, country, amount].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const donorImageLocalPath = req.files?.donorImage[0]?.path;

  if (!donorImageLocalPath) {
    throw new ApiError(401, "Donor Image Local Path is required");
  }

  const donorImage = await uploadOnCloudinary(donorImageLocalPath);
  // console.log("This is donor Image",donorImage);

  if (!donorImage) {
    throw new ApiError(401, "Donor Image not exist");
  }

  const donor = await Donor.create({
    fullName,
    country,
    address,
    email,
    purpose,
    status,
    amount,
    donationDate,
    whatsApp,
    donorImage: donorImage?.url || "",
  });

  const createdDonor = await Donor.findById(donor._id);

  if (!createdDonor) {
    throw new ApiError(500, "Something went wrong while registering the donor");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdDonor, "Donor registered successfully"));
});

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
