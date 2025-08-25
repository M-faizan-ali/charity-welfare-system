import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
    // cloud_name:"duvqhr5y5",
    // api_key:156572243875633,
    // api_secret:"CwIuuSOm13PV_wJien12W24noOc",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("File uploaded to Cloudinary successfully:", response.url); // Added success log
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        // *** ADD THIS LINE ***
        console.error("Cloudinary upload failed:", error);
        // ********************

        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}