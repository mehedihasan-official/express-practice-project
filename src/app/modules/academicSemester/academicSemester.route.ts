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

router.get("/", AcademicSemesterController.getAllAcademicSemestersFromDb)

router.get("/:id", AcademicSemesterController.getSingleAcademicSemesterFromDb),

router.patch("/:id",validationRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterController.updateAcademicSemesterIntoDb)

export const AcademicSemesterRoute = router;
