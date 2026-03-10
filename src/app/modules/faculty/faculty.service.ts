import { QueryBuilder } from "../../builder/QueryBueld";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const createFaculty = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

const getAllFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find().populate("academicDepartment"), query)
    .search(["id", "name.firstName", "name.middleName", "name.lastName"])
    .filter()
    .sort()
    .paginate()
    .fields();  


const result = await facultyQuery.modelQuery;
return result;

};


const getSingleFaculty = async (id: string) =>{
    const result = await Faculty.findById(id).populate("academicDepartment");
    return result;
}


const updateFaculty = async (id: string,
    payload: Partial<TFaculty>
) => {
    const result = await Faculty.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
    
    return result;
}


const deleteFaculty = async (id: string) => {
    const result = await Faculty.findByIdAndDelete(id);
    return result;
}


export const FacultyServices = {
    createFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}