import express from "express";
import { createAnswer,getAnswers,getAnswerById,updateAnswer,deleteAnswer } from "../controllers/answer";

const answerRoutes = express.Router();

// answer routes
answerRoutes.route("/writeAnswer").post(createAnswer);
answerRoutes.route("/getAnswers").get(getAnswers);
answerRoutes.route("/getAnswerById/:id").get(getAnswerById);
answerRoutes.route("/updateAnswer/:id").patch(updateAnswer);
answerRoutes.route("/deleteAnswer/:id").delete(deleteAnswer);

export default answerRoutes;