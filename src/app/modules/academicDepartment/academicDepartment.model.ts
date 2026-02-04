import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import  httpStatus  from 'http-status';

export const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
  },
  
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
},

{
    timestamps: true,
  });


  
  export class AppError extends Error{
    public statusCode: number;
    
    constructor(statusCode: number,  message: string,  stack?: ''){
      super(message);
      this.statusCode = statusCode;

      if (stack){
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }

  createAcademicDepartmentSchema.pre('save', async function (next){
     const isDepartmentExists = await academicDepartment.findOne({name: this.name});
     console.log(isDepartmentExists);

        if (isDepartmentExists){
            throw new AppError(httpStatus.NOT_FOUND,'Academic Department with this name already exists!');
        }

  })





 createAcademicDepartmentSchema.pre(
  'findOneAndUpdate',
  async function (next) {
    const query = this.getQuery();

    const isDepartmentExists = await academicDepartment.findOne(query);

    if (!isDepartmentExists) {
     throw new AppError(
        httpStatus.NOT_FOUND,
        'This department does not exist, cannot update!'
      );
    }

    next();
  }
);




export const academicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  createAcademicDepartmentSchema,
);
