import express from "express";
import { VerifyToken } from "../middleware/verifyToken";
import { createAnswer,getAnswers,getAnswerById,updateAnswer,deleteAnswer, markAnswerPreferred,getUserAnswers } from "../controllers/answer";

const answerRoutes = express.Router();

// answer routes
answerRoutes.route("/writeAnswer").post(VerifyToken,createAnswer);
answerRoutes.route("/getAnswers").get(VerifyToken,getAnswers);
answerRoutes.route("/getAnswerById/:id").get(VerifyToken,getAnswerById);
answerRoutes.route("/updateAnswer/:id").patch(VerifyToken,updateAnswer);
answerRoutes.route("/deleteAnswer/:id").delete(VerifyToken,deleteAnswer);
answerRoutes.route("/markAnswerPreferred/:id").patch(VerifyToken,markAnswerPreferred);
answerRoutes.route("/getUserAnswers/:id").get(getUserAnswers);

export default answerRoutes;