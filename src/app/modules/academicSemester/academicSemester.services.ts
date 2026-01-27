import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemester } from "./academicSemester.model";


// create academic semester function here:
const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  // create academic semester logic here:

  // semester name --> semester code
  type TAcademicSemesternameCodeMapper = {
    [key: string]: string;
  };

  const academicSemesternameCodeMapper: TAcademicSemesternameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  if (academicSemesternameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code for the given semester name");
  }

  const result = await academicSemester.create(payload);
  return result;
};

// Get all academic semester function here:
const getAllAcademicSemestersFromDb = async () => {
    const result = await academicSemester.find();
    return result;
};

// Get single academic semester function here:
const getSingleAcademicSemesterFromDb = async (id: string) => {
    const result = await academicSemester.findOne({_id: id})
    return result;
}

// Update academic semester function here:
const updateAcademicSemesterIntoDb = async (id: string, payload: Partial<TAcademicSemester>) => {
    const result = await academicSemester.findByIdAndUpdate(id);
    return result;
}


// Delete academic semester function here:
const deleteAcademicSemesterFromDb = async (id: string) => {
    const result = await academicSemester.findByIdAndDelete(id);
    return result;
}

export const AcademicSemesterDataServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemestersFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
  deleteAcademicSemesterFromDb
};
