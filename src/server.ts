import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import { authMiddleware, AuthenticatedRequest } from "./middlewares/auth.js";

dotenv.config();

export const app = express();
app.use(helmet()); // <-- Adds security HTTP headers
app.use(express.json());

// Connection to the DB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Public routes 
app.use("/auth", authRouter);

// Protected route
app.get("/protected", authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
