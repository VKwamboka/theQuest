import { ref } from "joi";

const Joi = require('joi');

const questionSchema = Joi.object({
    Title: Joi.string()
        .min(3)
        .max(100)
        .required(),

    Body: Joi.string()
        .min(10)
        .max(5000)
        .required(),

    Code: Joi.string()
        .min(10)
        .max(5000)
        .required(),

    Tags: Joi.array()
        .items(Joi.string())
        .min(1)
        .max(6)
        .required()
});

// create question helpers
export const createQuizHelper = Joi.object({
    Title: Joi.string().required().messages({"string.empty": "Title is required"}),
    Body: Joi.string().required().messages({"string.empty": "Body is required"}),
    UserId:Joi.string(),
    Code:Joi.string(),
    Tags:Joi.array().items(Joi.string())
  });

// update question helpers
export const updateQuizHelper = Joi.object({
    Title: Joi.string(),
    Body: Joi.string(),
    Code:Joi.string(),
});
