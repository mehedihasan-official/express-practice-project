import Joi from "joi";

// 🔹 Reusable name validator (Capitalized)
const capitalizeName = Joi.string()
  .pattern(/^[A-Z][a-z]*$/)
  .message("{{#label}} must start with a capital letter followed by lowercase letters only");

// 🔹 User Name Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      "string.pattern.base": "First name must contain only letters",
      "any.required": "First name is required",
    }),

  middleName: capitalizeName
    .max(20)
    .optional(),

  lastName: capitalizeName
    .max(20)
    .required()
    .messages({
      "any.required": "Last name is required",
    }),
});

// 🔹 Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),

  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

// 🔹 Local Guardian Schema
const localGuardValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  relation: Joi.string().required(),
});

// 🔹 Main Student Schema
export const studentValidationJoiSchema = Joi.object({
  id: Joi.string().required(),

  name: userNameValidationSchema.required(),

  gender: Joi.string()
    .valid("male", "female")
    .required()
    .messages({
      "any.only": "The gender field is not supported",
    }),

  dateOfBirth: Joi.string().required(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
    }),

  contactNo: Joi.string().required(),

  emergencyContactNo: Joi.string().required(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "The blood group field is not supported",
    }),

  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),

  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardValidationSchema.required(),

  profileImage: Joi.string().uri().optional(),

  isActive: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .messages({
      "any.only": "Status can't be other than active/inactive",
    }),
});
