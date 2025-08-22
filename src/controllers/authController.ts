import { signupSchema, loginSchema } from "../schemas/authControllerSchema.js";
import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = signupSchema.parse(req.body);

    // Check if user already exists
    const exists = await userService.userExists(email);
    if (exists) return res.status(400).json({ error: "User already exists" });

    // Create new user
    await userService.createNewUser(email, password);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user by email
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Validate credentials and get JWT token
    const token = await userService.validateCredentials(password, user);

    res.json({ token });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};