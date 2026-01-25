import { Student } from "./student.model";

// service function to create a student in DB


// service function to get all students from DB
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// service function to get single student from DB by id
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// service function to delete student from DB by id
const deleteStudentFromDB = async (id: string) => {
  // const result = await Student.updateOne({ id }, { isDeleted: true });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
