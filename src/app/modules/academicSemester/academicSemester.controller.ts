import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";


const createAcademicSemester = catchAsync(async(req: Request, res: Response) => {
    
    const {academicSemesterData} = req.body;

    // call service layer
    const result = await acade
})


export const AcademicSemesterController = {
    createAcademicSemester
}