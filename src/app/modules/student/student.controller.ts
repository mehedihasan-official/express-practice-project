import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";




// get single student data:
const getSingleStudent = catchAsync(
  async (req, res, next) => {
   
      const { studentId} = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB( studentId as string);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    })
  }
)



//get all students data:
const getAllStudents: RequestHandler = catchAsync( async (req, res, next) => {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
  })
})

//delete student data:
const deleteStudent: RequestHandler = catchAsync ( async (req, res, next) => {
 
    const { studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDB( studentId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
  })
})

export const StudentController = {
  getSingleStudent,
  getAllStudents,
  deleteStudent,
}

