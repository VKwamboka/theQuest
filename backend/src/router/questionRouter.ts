import express from "express";
import{createQuestion, getAllQuestions} from '../controllers/question'

const questionRoutes = express.Router();

// question routes
questionRoutes.route("/postQuestion").post(createQuestion);
questionRoutes.route("/getAllQuestions").get(getAllQuestions);

export default questionRoutes;