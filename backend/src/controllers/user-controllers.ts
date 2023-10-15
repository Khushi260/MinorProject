import { NextFunction,Request,Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (
    req:Request, 
    res:Response, 
    next:NextFunction) => {
    try {
        const users = await User.find(); // Add `await` to wait for the promise to resolve
        res.status(200).json({message: "OK", users}); // Respond with the found users
    } catch (error) {
        // Handle errors properly, e.g., send an error response
        console.error(error);
        res.status(500).json({ error: "Internal server error", cause: error.message });
    }
};
