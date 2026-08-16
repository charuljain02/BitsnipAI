import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./configs/connectDb.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import componentRouter from "./routes/component.route.js";
import paymentRouter from "./routes/payment.route.js";   // ← add this

dotenv.config();

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = express();


// --------------------
// Middleware
// --------------------

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


// --------------------
// Test Route
// --------------------

app.get("/", (req, res) => {
    res.json("Hello From Server");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/component", componentRouter);
app.use("/api/payment", paymentRouter);
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server Started on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();