import { model, Schema } from "mongoose";
import {
  TAcademicSemester,
} from "./academicSemester.interface";
import { AcademicSemesterCodes, Months, SemestersNameSchema } from "./academicSemester.constant";



export const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    enum: SemestersNameSchema,
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  code: {
    enum: AcademicSemesterCodes,
    type: String,
    required: true,
  },
  startMonth: {
    enum: Months,
    type: String,
    required: true,
  },
  endMonth: {
    enum: Months,
    type: String,
    required: true,
  },
});

export const academicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
