import { Student } from "../student.model";
import { TStudent } from "./student.interface";
import { cors } from 'cors';

// service function to create a student in DB
const createStudentIntoDB = async (studentData: TStudent) => {


   if (await Student.isUserExist(studentData.id)) {
    throw new Error("Student already exists");
  }

  //build in Method Approach:
  const result = await Student.create(studentData)

 
//Static Method Approach:
  // const student = new Student(studentData); //create instance
  
  // if (await student.isUserExist(studentData.id)){
  //   throw new Error("Student already exists");
  // }


  // const result = await student.save(); // build in instance method to save data
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
