import crypto from "crypto";
import path from "path";
import { Request, Response, NextFunction }  from "express";
import multer from "multer";


// file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/src/storage"));
  },
  filename: (req, file, cb) => {
    const uniqueKey: string = crypto.randomUUID() + path.extname(file.originalname);
    
    cb(null, uniqueKey);
  }
});


const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 52MB approx.
    files: 5, // Max 5 files are accepted
  },
}).array("files", 5);


export const fileUploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    fileUpload(req, res, (err: unknown) => {
      if (err) {
        // Multer error or other error
        return res.status(400).json({ error: (err as Error).message });
      }
  
      // Check if files exist
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return res.status(400).json({ message: "No files found" });
      }
  
      // Let the request continue if files are present
      next();
    });
}
