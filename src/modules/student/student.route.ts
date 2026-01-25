import express from "express";
import { StudentController } from "./student.controller";
import { UserController } from "../user/user.controller";

const router = express.Router();

//will call controller func

//Student router to get Students data:
router.get("/", StudentController.getAllStudents);

//Router to get single Student data by id:
router.get("/:id", StudentController.getSingleStudent);

//Router to Delete Student data by id:
router.delete("/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
