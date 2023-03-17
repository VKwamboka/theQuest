import { ref } from "joi";

const Joi = require('joi');


// create Vote helpers
export const createVoteHelper = Joi.object({
    vote_type: Joi.string().required().messages({"string.empty": "Vote type is required"}),
    user_id: Joi.string().required().messages({"string.empty": "User id is required"}),
    answer_id: Joi.string().required().messages({"string.empty": "Answer id is required"}),
    // Vote_id: Joi.string().required().messages({"string.empty": "Vote id is required"})
  });

// update vote helpers
export const updateVoteHelper = Joi.object({
    vote_type: Joi.string().required().messages({"string.empty": "Vote type is required"}),
    answer_id: Joi.string().required().messages({"string.empty": "Answer id is required"}),
    user_id: Joi.string().required().messages({"string.empty": "User id is required"})
});
