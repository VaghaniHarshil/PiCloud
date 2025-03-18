import fs from "fs";
import { Request, Response } from "express";
import { encrypt } from "../../utils/encrypt";



export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const allFiles = Object.values(files).flat();

    try {
        // no files provided
        if (!allFiles) {
            throw new Error("No File Found!");
        }

        for (let key in allFiles) {
            // reading file from /storage
            const data = fs.readFileSync(allFiles[key].path);

            // encrypting the file
            const blob = await encrypt(data);

            // writing the buffer to a text file with generated filename
            fs.writeFileSync(`${allFiles[key].destination}/${allFiles[key].filename}.harshil`, blob);

            // removing file original file from the storage
            fs.unlinkSync(allFiles[key].path);
        }

        res.status(200).json({
            message: "File uploaded.."
        });
    } catch (e) {
        if (!e) {
            res.status(500).json({
                message: "Something went wrong!"
            });

            return;
        }

        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            });
        } else {
            res.status(500).json({
                message: "internal server error"
            });
        }
    }
};
