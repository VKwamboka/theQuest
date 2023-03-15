import express from "express";
import{createQuestion, getAllQuestions,getQuestionById} from '../controllers/question'

const questionRoutes = express.Router();

// question routes
questionRoutes.route("/postQuestion").post(createQuestion);
questionRoutes.route("/getAllQuestions").get(getAllQuestions);
questionRoutes.route("/getQuestionById/:id").get(getQuestionById);

export default questionRoutes;