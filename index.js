import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import FileUpload from "express-fileupload";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

try {
    await db.authenticate();
    console.log('Database Connected..')
   //await Marka.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(UserRoute);

app.listen(PORT, server_host, ()=> {
    console.log(`Server up and running in port ${PORT}...`);
});