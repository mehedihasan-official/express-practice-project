
import express from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validationRequest from '../../middlewares/validateRequest';


const router = express.Router();


router.post('/', validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema) ,academicDepartmentController.createAcademicDepartment);
router.put('/:id', validationRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema) ,academicDepartmentController.updateAcademicDepartment);
router.get('/', academicDepartmentController.getAllAcademicDepartments);
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);

export const academicDepartmentRoute = router;
