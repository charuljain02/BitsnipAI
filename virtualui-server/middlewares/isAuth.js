import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "User does not have token"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!verifyToken) {
            return res.status(401).json({
                message: "User does not have valid token"
            });
        }

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.error("isAuth Error:", error);

        return res.status(401).json({
            message: `Authentication failed: ${error.message}`
        });
    }
};

export default isAuth;