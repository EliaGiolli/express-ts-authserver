import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import { authMiddleware, AuthenticatedRequest } from "./middlewares/auth.js";

dotenv.config();

export const app = express();
app.use(express.json());

// Connessione al DB
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log("✅ Connected to MongoDB");
});

// Routes pubbliche
app.use("/auth", authRouter);

// Route protetta
app.get("/protected", authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({ message: "Access granted!", user: req.user });
});
