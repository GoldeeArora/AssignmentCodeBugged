import express from "express";
// import { Router } from "express";
import { login, signup } from "../controllers/user-controller.js";
const userRouter = express.Router();
// userRouter.get("/", getAllUsers); // showing all the data on the website using controller
userRouter.post("/signup", signup);
userRouter.post("/login", login);
export default userRouter;
