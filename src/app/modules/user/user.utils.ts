import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

//
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({ createdAt: -1})
  .lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : null;
};

// year semester code 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementedId = `${payload.year}${payload.code}${incrementedId}`;
  return incrementedId;
};
