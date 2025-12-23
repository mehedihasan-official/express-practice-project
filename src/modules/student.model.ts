import { model, Schema } from "mongoose";
import validator from "validator";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student/student.interface";



// Mongoose Schema Definitions
``
const userNameSchema = new Schema<UserName>({
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
    maxlength: [20, "Last name cannot exceed 20 characters"]
  },
});

const GuardianSchema = new Schema<Guardian>({
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

const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Name is required"] },
  occupation: { type: String, required: [true, "Occupation is required"] },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  relation: { type: String, required: [true, "Relation is required"] },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
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

  dateOfBirth: { type: String, required: true },
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
  isActive: {
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "Status can't be other than active/inactive",
    },
    default: "active",
  },
});

//here is model:

export const StudentModel = model<Student>("Student", studentSchema);
