import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

//dotenv config
dotenv.config();

//express app
const app = express();

//morgan
if(process.env.NODE_INV !== "production"){
    app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json req body
app.use(express.json());

//parse json req url
app.use(express.urlencoded({extended: true}));

//sanitize req data
app.use(mongosanitize());

//cookie-parser
app.use(cookieParser());

//compression
app.use(compression());

//file upload
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

//cors
app.use(cors());


app.post('/test', (req,res)=>{
    res.send(req.body)
})

export default app;
