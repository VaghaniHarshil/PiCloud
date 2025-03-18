import express from "express";
import { handleFileUpload } from "../actions/api/file-upload";
import { fileUploadMiddleware } from "../middlewares/file-upload";

const FileRouter = express.Router();


FileRouter.post('/upload', fileUploadMiddleware, handleFileUpload);



export default FileRouter;

