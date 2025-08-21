import { signupSchema } from "../schemas/authControllerSchema.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

export const signupUser = async (req:Request, res:Response) => {
    try {
    const { email, password } = signupSchema.parse(req.body);

    // Controllo se esiste già
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = signupSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}