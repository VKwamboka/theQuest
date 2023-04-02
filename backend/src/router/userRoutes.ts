import express from "express";
import { RegisterUser , sendEmailToUser,updatePasswordUser,loginUser,getAllUsers,getProfile,deleteUser,updatePassword,getUserById, updateProfile,deleteUserCompletely,getUserId} from "../controllers/user";
import { VerifyToken } from "../middleware/verifyToken";

const userRoutes = express.Router();

// user routes
userRoutes.route("/signup").post(RegisterUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/profile/:userId").get(VerifyToken,getProfile);
userRoutes.route("/users").get(VerifyToken,getAllUsers);
userRoutes.route("/delete/:id").patch(VerifyToken,deleteUser);
userRoutes.route("/updatepassword/:id").patch(updatePassword);
userRoutes.route("/user/:id").get(VerifyToken,getUserById);
userRoutes.route("/updateprofile/:id").patch(VerifyToken,updateProfile);
userRoutes.route("/updatepassworduser").patch(VerifyToken, updatePasswordUser);
userRoutes.route("/sendemail").post(sendEmailToUser);
userRoutes.route("/deletecompletely/:id").delete(VerifyToken,deleteUserCompletely);
userRoutes.route("/getUserId").get(VerifyToken,getUserId);



export default userRoutes;