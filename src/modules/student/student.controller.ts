import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student: StudentData} = req.body;

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(StudentData);

    //send response
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create student",
      error: err,
    });
  }
};

export const StudentController = {
    createStudent
}
