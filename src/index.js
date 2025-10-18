// require('dotenv').config({path: './env'})

import mongoose from "mongoose";
import { DB_Name } from "./constants.js";
import connectDB from "./db/index.js";

connectDB();









// import express from "express";
// const app = express();
// (async ()=>{
//     try
//     {
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`)
//         app.on("error",(error)=>
//         {
//             console.log("Unable to connect with database---- ERROS IS : ",error);
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log("APP is Running on Port ",process.env.PORT)
//         })

//     }
//     catch(error){
//             console.error("ERROR! : ",error)
//     }
// })()                  // EFE concept in javscript and it will execute when code will executed