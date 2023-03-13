import express from "express";
import { RegisterUser } from "../controllers/user";

const userRoutes = express.Router();

// Register a new user - public
userRoutes.route("/signup").post(RegisterUser);


export default userRoutes;