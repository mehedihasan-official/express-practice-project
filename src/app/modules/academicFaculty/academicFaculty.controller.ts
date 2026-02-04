import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus  from 'http-status';


const createAcademicFaculty = catchAsync(async(req: Request, res: Response) => {
    // call service layer:
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
    })
})

// Update academic faculty:
const updateAcademicFaculty = catchAsync(async(req: Request, res: Response)=> {
    const id = req.params.id as string;
    const result = await academicFacultyServices.updateAcademicFacultyFromDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result
    })

})

// Get all academic faculties: 
const getAllAcademicFaculties = catchAsync(async(req: Request, res: Response) =>{
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty fetched data successfully',
        data: result
    })
})

// Get Single academic faculty:
const getSingleAcademicFaculty = catchAsync(async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Data academic Faculty fetched data successfully',
        data: result
    })
})
 


export const academicFacultyController = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    
}