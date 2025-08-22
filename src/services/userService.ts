import { User, IUser } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    constructor() {}

    // Check if a user exists by email
    async userExists(email: string): Promise<boolean> {
        const existing = await User.findOne({ email });
        return !!existing;
    }

    // Find a user by email and return the user object or null
    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    // Validate user credentials and return JWT token if valid
    async validateCredentials(password: string, user: IUser): Promise<string> {
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new Error("Wrong credentials");

        const token = jwt.sign(
            { sub: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
        return token;
    }

    // Hash password & save new user, return the created user
    async createNewUser(email: string, password: string): Promise<IUser> {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, passwordHash });
        await newUser.save();
        return newUser;
    }
}