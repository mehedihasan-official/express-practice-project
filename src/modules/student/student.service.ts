import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

// service function to create a student in DB
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// service function to get all students from DB
const GetAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// service function to get single student from DB by id
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  GetAllStudentsFromDB,
  getSingleStudentFromDB,
};
