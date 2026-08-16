import express from "express";
import { getCurrentUser, getAllUsers } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.get("/all-users", isAuth, isAdmin, getAllUsers);

export default userRouter;