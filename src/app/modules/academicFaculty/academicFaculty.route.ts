import express from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validationRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post('/', validationRequest(AcademicFacultyValidation.CreateAcademicFacultyValidationSchema) ,academicFacultyController.createAcademicFaculty);
router.put('/:id', validationRequest(AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.get('/', academicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRoute = router;