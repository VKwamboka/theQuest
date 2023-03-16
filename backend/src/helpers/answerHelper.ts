import { ref } from "joi";

const Joi = require('joi');


// create question helpers
export const createAnswerHelper = Joi.object({
    answer_text: Joi.string().required().messages({"string.empty": "Answer text is required"})
  });

// update question helpers
export const updateAnswerHelper = Joi.object({
    answer_text: Joi.string().required().messages({"string.empty": "Answer text is required"})
});
