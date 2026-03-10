import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service"
import httpStatus from 'http-status';
import { Faculty } from './faculty.model';



//Create a Faculty data:
const CreateFaculty = async (req, res) => {
    const result = await FacultyServices.createFaculty(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty is created successfully",
        data: result,
    })
}


// Get all Faculty data:
const getAllFaculties = async (req, res)=> {
    const result = await FacultyServices.getAllFaculties(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all faculties successfully",
        data: result,
    })
}


// Get single Faculty data: 
const getSingleFaculty = async (req, res) =>{
    const {id} = req.params;
    const result = await FacultyServices.getSingleFaculty(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single faculty successfully",
        data: result,
    })
}


// Update Faculty data: 
const updateFaculty = async (req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.updateFaculty(id, req.body);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty is updated successfully",
        data: result,
    })
}
   

// Delete Faculty data:
const deleteFaculty = async (req, res) =>{
    const {id} = req.params;
    const result = await FacultyServices.deleteFaculty(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty is deleted successfully",
        data: result,
    })
}




export const FacultyController = {
    CreateFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}