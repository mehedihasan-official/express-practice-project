import express, { NextFunction, Request, Response } from "express";

import { studentValidationZodSchema, studentValidations } from "../student/student.zod.validation";
import { UserController } from "./user.controller";
import validationRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post('/create-student', validationRequest(studentValidationZodSchema), UserController.createStudentIntoDB);


export const UserRoutes = router;