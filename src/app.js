import express from "express";

//expres app
const app = express();

app.get('/', (req,res)=>{
    res.send("Hello form ChitChat Server")
})

export default app;
