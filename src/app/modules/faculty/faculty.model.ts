import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, "Faculty id is required"],
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
    },

    name: {
      type: userNameSchema,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },

    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },

    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },

    profileImage: {
      type: String,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// static method
facultySchema.statics.isUserExist = async function (id: string) {
  return await Faculty.findOne({ id });
};


export const Faculty = model<TFaculty, FacultyModel>("Faculty", facultySchema);