// root file do not export or fuck around
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// global environment config
dotenv.config();

const app = express();

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(process.env.ENVIRONMENT === "PROD" ? "combined" : "dev"));





const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("SERVER SAMBHADE CHHE!");
});
