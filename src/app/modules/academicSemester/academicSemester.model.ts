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
    type: String,
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


academicSemesterSchema.pre("save", async function(next){
  // logic before saving data:
  const isSemesterExist = await academicSemester.findOne({
    name: this.name,
    year: this.year
  })
  if (isSemesterExist){
    throw new Error("Academic Semester already exists!")
  }
})

export const academicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
