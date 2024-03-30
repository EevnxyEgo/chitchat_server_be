import app from "./app.js"
import dotenv from "dotenv";

//dotenv config
dotenv.config();

//emv variables
const PORT = process.env.PORT || 8000;


app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}... `)
});