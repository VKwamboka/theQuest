import express from "express";
import { RegisterUser , sendEmailToUser,updatePasswordUser,loginUser,getAllUsers,getProfile,deleteUser,updatePassword,getUserById, updateProfile,deleteUserCompletely} from "../controllers/user";

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
userRoutes.route("/sendemail").post(sendEmailToUser);
userRoutes.route("/deletecompletely/:id").delete(deleteUserCompletely);



export default userRoutes;