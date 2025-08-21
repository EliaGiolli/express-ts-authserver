import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv'

export const app = express();

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!).then(() => console.log('"✅ Connected to MongoDB"'));
