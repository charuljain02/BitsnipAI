import User from "../models/user.models.js";
import { genToken } from "../configs/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        console.error("Google Auth Error:", error);

        return res.status(500).json({
            message: `Google Auth Error: ${error.message}`
        });
    }
};


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logout Successfully"
        });

    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            message: `Failed to logout: ${error.message}`
        });
    }
};