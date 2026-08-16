import User from "../models/user.models.js";
import { genToken } from "../configs/token.js";

const isProduction = process.env.NODE_ENV === "production";

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

        // ✅ Updated cookie options for cross-domain HTTPS support
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,               // Must be true on Render (HTTPS)
            sameSite: isProduction ? "none" : "lax", // Must be "none" for cross-domain requests
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
        // ✅ Match the same cookie options when clearing
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
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
