
import Joi, { ref } from "joi";

// signup Helper
export const UserSignUpHelper = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  Password: Joi.string().required(),
  confirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// signin Helper
export const UserSignInHelper = Joi.object({
  Email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  Password: Joi.string().required().messages({
    "string.empty": "Please provide a Password",
  }),
});

// forgot Password Helper
export const UserForgotPasswordHelper = Joi.object({
  Email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
});

// reset Password Helper
export const UserPasswordResetHelper = Joi.object({
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user profile Helper
export const UserUpdateProfileHelper = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user Password Helper
export const UserUpdatePasswordHelper = Joi.object({
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const UserUpdateProfileByAdminHelper = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  isDeleted: Joi.boolean(),
  Role: Joi.string(),
});