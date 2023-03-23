import { ref } from "joi";

const Joi = require('joi');


// create comment helpers
export const createCommentHelper = Joi.object({
    comment_text: Joi.string().required().messages({"string.empty": "Comment text is required"}),
    // user_id: Joi.string().required().messages({"string.empty": "User id is required"}),
    answer_id: Joi.string().required().messages({"string.empty": "Answer id is required"}),
    // comment_id: Joi.string().required().messages({"string.empty": "Comment id is required"})
  });

// update question helpers
export const updateCommentHelper = Joi.object({
    comment_text: Joi.string().required().messages({"string.empty": "Comment text is required"}),
    answer_id: Joi.string().required().messages({"string.empty": "Answer id is required"}),
    user_id: Joi.string().required().messages({"string.empty": "User id is required"})
  
});
