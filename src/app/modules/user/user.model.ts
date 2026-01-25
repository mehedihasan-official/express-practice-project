import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
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

userSchema.pre('save', async function (next){
    // eslint-disable-next-line
    const user = this;

    // hashing password and save into DB
    user.password = await bcrypt.hash(user.password, Number(config.bycrypt_salt_rounds));
    
})


// set '' after saving password
userSchema.post('save', function ( doc, next){
    doc.password = '';
    next();
})



export const User = model<TUser>("User", userSchema);
