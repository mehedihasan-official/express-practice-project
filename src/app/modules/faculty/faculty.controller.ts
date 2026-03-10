import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service"
import httpStatus from 'http-status';



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