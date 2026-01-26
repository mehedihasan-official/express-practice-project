import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterDataServices } from "./academicSemester.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus  from 'http-status';


const createAcademicSemester = catchAsync(async(req: Request, res: Response) => {
    

    // call service layer
    const result = await AcademicSemesterDataServices.createAcademicSemesterIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully",
        data: result,
    })
})


export const AcademicSemesterController = {
    createAcademicSemester
}