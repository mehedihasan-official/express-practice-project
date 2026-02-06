import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

// get single student data:
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(
    id as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get single student successfully",
    data: result,
  });
});

//get all students data:
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all Student Successfully",
    data: result,
  });
});




//update student data:
const updateStudent:RequestHandler = catchAsync(async (req, res, next) =>{
  const {id} = req.params ;
  const {student} = req.body;
  const result = await StudentServices.updateStudentToDB(id as string , student);

  sendResponse(res, { 
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data successfully updated",
    data: result
  })

})

//delete student data:
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted Student successfully",
    data: result,
  });
});


export const StudentController = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
