import express from "express";
import validationRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validationRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

router.get("/get-all-academic-semesters", AcademicSemesterController.getAllAcademicSemestersFromDb)

export const AcademicSemesterRoute = router;
