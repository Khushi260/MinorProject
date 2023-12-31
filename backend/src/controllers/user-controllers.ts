import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import path from "path";
import { COOKIE_NAME } from "../utils/constants.js";

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
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();


        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });


        res.status(201).json({ message: "OK", id: user._id.toString() });
    } catch (error) {

        console.error(error);
        res.status(200).json({ error: "Error", cause: error.message });
    }
};


export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });


        res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {

        console.error(error);
        res.status(200).json({ error: "Error", cause: error.message });
    }
};

