
import Joi, { ref } from "joi";

// signup Helper
export const UserSignUpHelper = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required(),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// signin Helper
export const UserSignInHelper = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please provide a password",
  }),
});

// forgot password Helper
export const UserForgotPasswordHelper = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
});

// reset password Helper
export const UserPasswordResetHelper = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user profile Helper
export const UserUpdateProfileHelper = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user password Helper
export const UserUpdatePasswordHelper = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const UserUpdateProfileByAdminHelper = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  isDeleted: Joi.boolean(),
  isAdmin: Joi.boolean(),
});