import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Student } from "./student.model";

// service function to get all students from DB
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

// service function to get single student from DB by id
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// service function to delete student from DB by id
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    console.log('=== DELETE STUDENT DEBUG ===');
    console.log('1. ID received:', id);
    console.log('2. ID type:', typeof id);

    // Check if student exists BEFORE transaction
    const checkStudent = await Student.findOne({ id });
    console.log('3. Student found (before transaction):', checkStudent ? 'YES' : 'NO');
    if (checkStudent) {
      console.log('4. Student isDeleted status:', checkStudent.isDeleted);
      console.log('5. Student _id:', checkStudent._id);
      console.log('6. Student id field:', checkStudent.id);
    }

    // Check if user exists BEFORE transaction
    const checkUser = await User.findOne({ id });
    console.log('7. User found (before transaction):', checkUser ? 'YES' : 'NO');
    if (checkUser) {
      console.log('8. User isDeleted status:', checkUser.isDeleted);
      console.log('9. User _id:', checkUser._id);
      console.log('10. User id field:', checkUser.id);
    }

    // First check if student exists and is not already deleted
    const existingStudent = await Student.findOne({ id, isDeleted: false });
    
    if (!existingStudent) {
      console.log('11. ERROR: Student not found or already deleted');
      throw new AppError(
        httpStatus.NOT_FOUND, 
        "Student not found or already deleted"
      );
    }

    console.log('12. Attempting to update student...');

    // Delete student (transaction-1)
    const deletedStudent = await Student.findOneAndUpdate(
      { id, isDeleted: false },
      { isDeleted: true },
      { new: true, session }
    );

    console.log('13. Student update result:', deletedStudent ? 'SUCCESS' : 'FAILED');

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    console.log('14. Attempting to update user...');

    // Delete user (transaction-2)
    const deletedUser = await User.findOneAndUpdate(
      { id, isDeleted: false },
      { isDeleted: true },
      { new: true, session }
    );

    console.log('15. User update result:', deletedUser ? 'SUCCESS' : 'FAILED');

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    console.log('16. Transaction committed successfully!');
    console.log('=== END DEBUG ===');

    return deletedStudent;
  } catch (err) {
    console.log('ERROR caught:', err);
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
