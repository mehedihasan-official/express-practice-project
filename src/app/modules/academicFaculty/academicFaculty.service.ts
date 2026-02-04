import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async ( payload: TAcademicFaculty) => {
    // create an academic faculty
    const result = await AcademicFaculty.create(payload);
    return result;

}

// get all academic faculties from DB:
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

// get single academic faculty by id from DB:
const getSingleAcademicFacultyFromDB = async (id: string) =>{
    const result = await AcademicFaculty.findOne({_id: id});
    return result;
}

// Update academic faculty by id from DB:
const updateAcademicFacultyFromDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.updateOne({_id: id},payload);
    return result;
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB
}