import express from "express";
import validationRequest from "../../middlewares/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = express.Router();

// Curse router to create data:
router.post(
  "/",
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

//Course router to get all course data:
router.get("/", CourseController.getAllCourse);

//Course router to get single course data by id:
router.get("/:id", CourseController.getSingleCourse);

//Course router to Update course data by id:
router.patch(
  "/:id",
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);

//Course router to Delete course data :
router.delete("/:id", CourseController.deleteCourse);

export const CourseRoutes = router;
