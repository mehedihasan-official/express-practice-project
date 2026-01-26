import express, { Request, Response } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';


const router = express.Router();

router.post('/create-academic-semester', AcademicSemesterController.createAcademicSemester);



export const AcademicSemesterRoutes = router;