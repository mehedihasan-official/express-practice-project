import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartment, AppError } from "./academicDepartment.model";
import  httpStatus  from 'http-status';


// create an academic department:
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

        // Check if Department with same name already exists:

       

  const result = await academicDepartment.create(payload);
  return result;
};

// get all academic departments from DB:
const getAllAcademicDepartmentDataFromDB = async () => {
    const result = await academicDepartment.find().populate('academicFaculty');
    return result;
}

// get single academic department by id from DB:
const getSingleAcademicDepartmentDataFromDB = async (id: string) => {
    const result = await academicDepartment.findOne({_id: id}).populate('academicFaculty');
    return result;
}


// update academic department by id from DB:
const updateAcademicDepartmentDataFromDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await academicDepartment.updateOne({_id: id}, payload);
    if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department not found'
    );
  }

    if (result.matchedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department not found'
    );
  }

    return result;
}



export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentDataFromDB,
    getSingleAcademicDepartmentDataFromDB,
    updateAcademicDepartmentDataFromDB

}
