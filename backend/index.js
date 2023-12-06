import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Route from "./router/route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config()

// app.use(cors(
//     {
//         origin:["https://deploy-mern-1whq.versal.app"],
//         method:["POST","GET"],
//         credentials:true
//     }
// ))

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb.")
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected!");
})

app.use(cookieParser());
app.use(express.json());

app.use("/api",Route);
// app.use("/api/property", addProperty);
// app.use("/api/user", userRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wront!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    })
})

app.listen(5000,()=>{
    connect();
    console.log("Connected to backend");
})