import express from "express";
import{createQuestion, getAllQuestions,getQuestionById,updateQuestion,deleteQuestion,getFullQuestionById,getUserQuestions} from '../controllers/question'
import { VerifyToken } from "../middleware/verifyToken";

const questionRoutes = express.Router();

// question routes
questionRoutes.route("/postQuestion").post(VerifyToken, createQuestion);
questionRoutes.route("/getAllQuestions").get(VerifyToken, getAllQuestions);
questionRoutes.route("/getQuestionById/:id").get(VerifyToken, getQuestionById);
questionRoutes.route("/updateQuestion/:id").patch(VerifyToken, updateQuestion);
questionRoutes.route("/deleteQuestion/:id").delete(VerifyToken, deleteQuestion);
questionRoutes.route("/getFullQuestionById/:id").get(VerifyToken, getFullQuestionById);
questionRoutes.route("/getUserQuestions/:id").get( getUserQuestions);

export default questionRoutes;