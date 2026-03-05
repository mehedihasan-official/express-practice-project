import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import { QueryBuilder } from "../../builder/QueryBueld";
import { studentSearchableFields } from "./student.constant";

// service function to get all students from DB
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

  // const queryObj = { ...query };

 

  // const searchTerm = (query?.searchTerm as string) || "";

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: {
  //       $regex: searchTerm,
  //       $options: "i",
  //     },
  //   })),
  // });

  //filtering:
//   const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

//   excludeFields.forEach((el) => delete queryObj[el]);

  

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     });

//   let sort = "-createdAt";

//   if (query?.sort) {
//     sort = query.sort as string;
//   }

//   const sortQuery = filterQuery.sort(sort);

//   let page = 1;

//   let skip = 0;
//   let limit = 1;

//   if (query?.limit) {
//     limit = Number(query.limit);
//   }

//   if (query?.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }

//   const paginateQuery = sortQuery.skip(skip);

//   const limitQuery = paginateQuery.limit(limit);
  

//   //fields limitation:

//   let fields = "-__v";
//   if (query?.fields){
//     fields = (query.fields as string).split(",").join(" ");
//     console.log(fields)
//   }

//   const fieldQuery = await limitQuery.select(fields);

//   return fieldQuery;
// };

// // service function to get single student from DB by id
// const getSingleStudentFromDB = async (id: string) => {
//   const result = await Student.findOne({ id })
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     });
//   return result;

const studentQuery = new QueryBuilder(Student.find() .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),query).search(studentSearchableFields).filter().sort().paginate().fields()

const result = await studentQuery.modelQuery
return result;

};

// Update function to get single
const updateStudentToDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // Handle nested name object updates
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// service function to delete student from DB by id
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // First check if student exists and is not already deleted
    const existingStudent = await Student.findOne({ id, isDeleted: false });

    if (!existingStudent) {
      console.log("11. ERROR: Student not found or already deleted");
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Student not found or already deleted",
      );
    }

    console.log("12. Attempting to update student...");

    // Delete student (transaction-1)
    const deletedStudent = await Student.findOneAndUpdate(
      { id, isDeleted: false },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // Delete user (transaction-2)
    const deletedUser = await User.findOneAndUpdate(
      { id, isDeleted: false },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    console.log("ERROR caught:", err);
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  updateStudentToDB,
  deleteStudentFromDB,
};
