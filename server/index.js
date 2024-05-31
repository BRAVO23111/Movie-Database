import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import { userRouter } from './controllers/AuthController.js';
import { MovieRouter } from './controllers/MovieRouter.js';

dotenv.config();
const app = express();
app.use(cors())
const db = mongoose.connect(process.env.MONGO_URI)
try {
    if(db){
        console.log("database connected");
    }
} catch (error) {
    console.log(error);
}
app.use(express.json());

app.use("/auth",userRouter);
app.use("/savedMovie", MovieRouter)
app.listen(3000,(req,res)=>{
    console.log("server at 3000");
})