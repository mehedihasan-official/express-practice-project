import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";



const createAcademicDepartment = catchAsync(async(req: Request, res: Response) => {
    // call service layer:
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department created successfully",
        data: result
    })

})


// Update academic department:
const updateAcademicDepartment = catchAsync(async(req: Request, res: Response)=> {
    const id = req.params.id as string;
    const result = await academicDepartmentServices.updateAcademicDepartmentDataFromDB(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department updated successfully",
        data: result
    })
})


// Get all academic departments:
const getAllAcademicDepartments = catchAsync(async(req: Request, res: Response)=> {
   
    const result = await academicDepartmentServices.getAllAcademicDepartmentDataFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Departments retrieved successfully",
        data: result
    })
})

// Get single academic departments:
const getSingleAcademicDepartment = catchAsync(async(req: Request, res: Response)=> {

    const id = req.params.id as string;
   
    const result = await academicDepartmentServices.getSingleAcademicDepartmentDataFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: " Single Academic Department retrieved successfully",
        data: result
    })
})


export const academicDepartmentController = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment
}