import { TAcademicSemester } from "./academicSemester.interface"
import { academicSemester } from "./academicSemester.model"


const createAcademicSemesterIntoDb = async (AcademicSemesterData: TAcademicSemester) => {
    // create academic semester logic here:

    const newAcademicSemester = await academicSemester.create(AcademicSemesterData)
}


export const AcademicSemesterDataServices = {
    createAcademicSemesterIntoDb
}