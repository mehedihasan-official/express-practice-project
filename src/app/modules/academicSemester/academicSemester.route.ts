import express from "express";
import validationRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/",
  validationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get("/", AcademicSemesterController.getAllAcademicSemestersFromDb);

router.get("/:id", AcademicSemesterController.getSingleAcademicSemesterFromDb),

router.patch(
    "/:id",
    validationRequest(
      AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemesterIntoDb,
  );

  router.delete("/:id", AcademicSemesterController.deleteAcademicSemesterFromDb);

export const AcademicSemesterRoute = router;
