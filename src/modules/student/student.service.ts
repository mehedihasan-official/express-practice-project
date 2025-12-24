import { Student } from "../student.model";
import { TStudent } from "./student.interface";

// service function to create a student in DB
const createStudentIntoDB = async (studentData: TStudent) => {
  const student = new Student(studentData); //create instance
  
  if (await student.isUserExist(studentData.id)){
    throw new Error("Student already exists");
  }
  const result = await student.save(); // build in instance method to save data
  return result;
};

// service function to get all students from DB
const GetAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// service function to get single student from DB by id
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  GetAllStudentsFromDB,
  getSingleStudentFromDB,
};
