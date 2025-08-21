import { Router } from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
const authRouter = Router();

// POST /signup
authRouter.post("/signup",signupUser);

// POST /login
authRouter.post("/login", loginUser);

export default authRouter;

