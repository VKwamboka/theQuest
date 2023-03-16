import { ref } from "joi";

const Joi = require('joi');


// create question helpers
export const createCommentHelper = Joi.object({
    comment_text: Joi.string().required().messages({"string.empty": "Comment text is required"})
  });

// update question helpers
export const updateCommentHelper = Joi.object({
    comment_text: Joi.string().required().messages({"string.empty": "Comment text is required"})
});
