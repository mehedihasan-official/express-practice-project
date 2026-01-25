import { NextFunction, Request, Response } from "express"
import { StudentServices } from "./student.service";


// get single student data:
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId} = req.params;

    const result = await StudentServices.getSingleStudentFromDB( studentId as string);
    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: result,
    })
  } catch (err){
    next(err)
  }
}

//get all students data:
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result,
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
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
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

