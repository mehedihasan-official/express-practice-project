import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { academicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a userData object
  const userData: Partial<TUser> = {};

  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  // find academic semester info:
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );


  // creating a session for transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generatedStudentId(
      admissionSemester as TAcademicSemester,
    );

    // create a use (transaction-1)
    const newUser = await User.create([userData], { session });


    // create a student
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create student user",
      );
    }
    // set id, _id as userData
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference_id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], {session});

    if (!newStudent.length){
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create student user",
      );

    }

    await session.commitTransaction();
    session.endSession();
    return newStudent;



  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userDataService = {
  createStudentIntoDB,
};
