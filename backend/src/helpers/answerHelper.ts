import { ref } from "joi";

const Joi = require('joi');


// create question helpers
export const createAnswerHelper = Joi.object({
  // user_id: Joi.string().required().messages({"string.empty": "User ID is required"}),
  question_id: Joi.string().required().messages({"string.empty": "Question ID is required"}),
  answer_text: Joi.string().required().messages({"string.empty": "Answer text is required"})
  });

// update question helpers
export const updateAnswerHelper = Joi.object({
    answer_text: Joi.string().required().messages({"string.empty": "Answer text is required"})
});
