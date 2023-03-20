import express from "express";
import{createQuestion, getAllQuestions,getQuestionById,updateQuestion,deleteQuestion,getFullQuestionById} from '../controllers/question'

const questionRoutes = express.Router();

// question routes
questionRoutes.route("/postQuestion").post(createQuestion);
questionRoutes.route("/getAllQuestions").get(getAllQuestions);
questionRoutes.route("/getQuestionById/:id").get(getQuestionById);
questionRoutes.route("/updateQuestion/:id").patch(updateQuestion);
questionRoutes.route("/deleteQuestion/:id").delete(deleteQuestion);
questionRoutes.route("/getFullQuestionById/:id").get(getFullQuestionById);

export default questionRoutes;