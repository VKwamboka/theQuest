import { ref } from "joi";

const Joi = require('joi');


// create question helpers
export const createQuizHelper = Joi.object({
    comment_text: Joi.string().required()
  });

// update question helpers
export const updateQuizHelper = Joi.object({
    comment_text: Joi.string().required()
});
