import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ?? null;
};

// year + semesterCode + 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  if (!payload?.year || !payload?.code) {
    throw new Error("Invalid academic semester data");
  }

  let currentId = "0000";

  const lastStudentId = await findLastStudentId();

  if (lastStudentId) {
    const lastYear = lastStudentId.substring(0, 4);
    const lastSemesterCode = lastStudentId.substring(4, 6);

    if (
      lastYear === payload.year &&
      lastSemesterCode === payload.code
    ) {
      currentId = lastStudentId.substring(6);
    }
  }

  const incrementedId = (Number(currentId) + 1)
    .toString()
    .padStart(4, "0");

  return `${payload.year}${payload.code}${incrementedId}`;
};
