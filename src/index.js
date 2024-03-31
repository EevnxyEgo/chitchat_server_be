import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

//env variables
const {DATABASE_URL} = process.env;
const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);

//mongodb error
mongoose.connection.on('error', (err)=>{
    logger.error(`Mongodb connection error: ${err}`);
    process.exit(1);
});

//mongodb debug mode
if(process.env.NODE_ENV !== 'production'){
    mongoose.set("debug", true);
}

//mongodb
mongoose.connect(DATABASE_URL,{}).then(()=>{
    logger.info('Connected to Database.');
});


let server;

server = app.listen(PORT, ()=> {
    logger.info(`Server is listening at ${PORT}... `);
    console.log("process id", process.pid);
});


//handle server errors
const exitHandler= () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }else{
        process.exit(1);
    }
};

const unexpectedErrorHandler= (error) => {
    logger.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
});