import { v2 as cloudinary } from "cloudinary";
import dontenv from "dotenv";

dontenv.config();

cloudinary.config();

export default cloudinary;
