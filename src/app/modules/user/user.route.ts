import express from "express";

import validationRequest from "../../middlewares/validateRequest";
import { createStudentValidationZodSchema } from "../student/student.zod.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post('/create-student', validationRequest(createStudentValidationZodSchema), UserController.createStudentIntoDB);


export const UserRoutes = router;