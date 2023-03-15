import express from "express";
import { RegisterUser , updatePasswordUser,loginUser,getAllUsers,getProfile,deleteUser,updatePassword,getUserById, updateProfile} from "../controllers/user";

const userRoutes = express.Router();

// user routes
userRoutes.route("/signup").post(RegisterUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/profile/:userId").get(getProfile);
userRoutes.route("/users").get(getAllUsers);
userRoutes.route("/delete/:id").patch(deleteUser);
userRoutes.route("/updatepassword/:id").patch(updatePassword);
userRoutes.route("/user/:id").get(getUserById);
userRoutes.route("/updateprofile/:id").patch(updateProfile);
userRoutes.route("/updatepassworduser/:id").patch(updatePasswordUser);


export default userRoutes;