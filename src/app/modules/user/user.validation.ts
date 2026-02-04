import z from "zod";

const userValidationSchema = z.object({
    id: z.string(),
  
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional(),
})

export const UserValidation = {
    userValidationSchema,
}