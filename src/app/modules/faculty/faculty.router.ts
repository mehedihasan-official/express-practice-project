import express from "express";
import { FacultyController } from "./faculty.controller";


const router = express.Router();

// Faculty router to create data:
router.post("/", FacultyController.CreateFaculty),

// Faculty router to get all faculty data:
router.get("/", FacultyController.getAllFaculties),

// Faculty router to get single faculty data by id:
router.get("/:id", FacultyController.getSingleFaculty),

// Faculty router to Update faculty data by id:
router.patch("/:id", FacultyController.updateFaculty),

// Faculty router to Delete faculty data :
router.delete("/:id", FacultyController.deleteFaculty)


export const FacultyRoutes = router;