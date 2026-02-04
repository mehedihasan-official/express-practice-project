import { model, Schema } from "mongoose";
import {
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from "./student.interface";
import { required, string } from "joi";

// Mongoose Schema Definitions
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name cannot exceed 20 characters"],
  },

  middleName: {
    type: String,
    trim: true,
    maxlength: [20, "Middle name cannot exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Last name cannot exceed 20 characters"],
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Name is required"] },
  occupation: { type: String, required: [true, "Occupation is required"] },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  relation: { type: String, required: [true, "Relation is required"] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "The gender field is not supported",
    },
    required: [true, "Gender is required"],
  },

  dateOfBirth: { type: String , required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: true, unique: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "The blood group field is not supported",
    },
    required: true,
  },

  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: GuardianSchema,
    required: true,
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: true,
  },
  profileImage: { type: String },

  admissionSemester:{
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  }
 
},
{
  toJSON: {
    virtuals: true,
  }
});

//Virtual:
studentSchema.virtual("fullName").get(function(){
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName : ""} ${this.name.lastName}`
});


// query middleware:
studentSchema.pre( 'find', function (next){
  this.find({ isDeleted: {$ne: true}})
});


// query middleware:
studentSchema.pre( 'findOne', function (next){
  this.find({ isDeleted: {$ne: true}})

});

// query middleware:
studentSchema.pre( 'aggregate', function (next){
  this.pipeline().unshift({$match: { isDeleted: { $ne: true}}})
});

//creating a custom static method:
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};



//creating a custom instance method:
// studentSchema.methods.isUserExist = async function (id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

//here is model:

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
