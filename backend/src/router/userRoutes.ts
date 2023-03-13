import express from "express";
import { RegisterUser , loginUser,getAllUsers,getProfile,deleteUser,updatePassword} from "../controllers/user";

const userRoutes = express.Router();

// user routes
userRoutes.route("/signup").post(RegisterUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/profile").get(getProfile);
userRoutes.route("/users").get(getAllUsers);
userRoutes.route("/delete/:id").patch(deleteUser);
userRoutes.route("/updatepassword/:id").patch(updatePassword);


export default userRoutes;