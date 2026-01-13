import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { studentValidationZodSchema } from "./student.zod.validation";


// controller function to create a student
const createStudent = async (req: Request, res: Response) => {


  try {

    const { student: StudentData } = req.body;

    // Validate incoming data using Zod schema
    const zodParseData = studentValidationZodSchema.parse(StudentData);
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    //send response
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create student",
      error: err, 
    });
  }
};

// controller function to get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.GetAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Students data retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve students data",
      error: err,
    });
  }
};

//Function to get single Student by ID:
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Single Student data retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve single student data",
      error: err,
    });
  }
};

//Function to delete Student by ID:
const deleteStudent = async ( req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error){
    res.status(400).json({
      success: false,
      message: "Failed to delete student",
      error: error,
    });
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
