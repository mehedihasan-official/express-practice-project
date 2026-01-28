import { z } from "zod";
import { Types } from 'mongoose';

// 🔹 Reusable name validator (Capitalized)
const capitalizeName = z.string().regex(/^[A-Z][a-z]*$/, {
  message: "Must start with a capital letter followed by lowercase letters only",
});

// 🔹 User Name Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ message: "First name is required" })
    .max(20)
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" }),

  middleName: capitalizeName.max(20).optional(),

  lastName: capitalizeName.max(20),
});

// 🔹 Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
});

// 🔹 Local Guardian Schema
const localGuardValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  relation: z.string().min(1),
});

// 🔹 Main Student Schema
export const createStudentValidationZodSchema = z.object({
  body: z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  
   student: z.object({
    name: userNameValidationSchema,
  
    gender: z.enum(["male", "female"], {
      error: "The gender field is not supported",
    }),
  
    dateOfBirth: z.string().optional(),
    email: z.email({ message: "Email must be a valid email address" }),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      error: "The blood group field is not supported",
    }),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardValidationSchema,
    admissionSemester: z.string(),
    profileImage: z.string().optional(),
 
  })
   })
})

export const studentValidations = {
 createStudentValidationZodSchema
}