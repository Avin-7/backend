import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  //here res in the parameter is not used inside the code body, so we are going to mention it as _ (undercsore), widely used in production applications
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
    //here req.header("Authorization").replace("Bearer ", ""); this line is to get cookies to mobile devices in form of header.
    //since mobile devices do not have access of cookies like websited
  
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = User.findById(decodedToken?._id).select(
      " -password -refreshToken"
    );
  
    if(!user){
      throw new ApiError(401, "Invalid Access Token")
    }
  
    req.user = user;
    next()
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token")
  }
});
