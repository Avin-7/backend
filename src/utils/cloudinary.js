import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //file system provided by Node js

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File saved successfully !!", res.url);
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath); //removes the locally saves file since uploading on cloudinary failed
    return null;
  }
};

export { uploadOnCloudinary };
