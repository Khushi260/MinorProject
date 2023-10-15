import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from 'bcrypt'

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const users = await User.find(); // Add `await` to wait for the promise to resolve
        res.status(200).json({ message: "OK", users }); // Respond with the found users
    } catch (error) {
        // Handle errors properly, e.g., send an error response
        console.error(error);
        res.status(500).json({ error: "Internal server error", cause: error.message });
    }
};


export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "OK", id: user._id.toString() });
    } catch (error) {

        console.error(error);
        res.status(200).json({ error: "Error", cause: error.message });
    }
};
