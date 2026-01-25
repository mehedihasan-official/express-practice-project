import config from "../../app/config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

  //create a userData object
  const userData: Partial<TUser> = {};

    //if password is not given, use default password
  userData.password = password || (config.default_password as string)

    //set student role
    userData.role = 'student'

    // set manually generated id
    userData.id = '203010001'

    // create a use
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length){
      // set id, _id as userData
      studentData.id = newUser.id;
      studentData.user = newUser._id //reference_id

      const newStudent = await Student.create(studentData);
      return newStudent;
    }
  
    // const newUser = await student.save(); // build in instance method to save data
    return newUser;
  };

  export const userDataService = {
    createStudentIntoDB
  }