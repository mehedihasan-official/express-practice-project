import { NextFunction, Request, Response } from "express"
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


// get single student data:
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId} = req.params;

    const result = await StudentServices.getSingleStudentFromDB( studentId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
  })
  } catch (err){
    next(err)
  }
}

//get all students data:
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
  })
  } catch (err){
    next(err)
  }
}

//delete student data:
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDB( studentId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
  })
  
  } catch (err){
  next(err)
  }
}

export const StudentController = {
  getSingleStudent,
  getAllStudents,
  deleteStudent,
}

