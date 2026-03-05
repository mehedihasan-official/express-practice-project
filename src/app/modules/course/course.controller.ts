import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import  httpStatus, { status }  from 'http-status';
import sendResponse from './../../utils/sendResponse';
import { STATUS_CODES } from "node:http";
import { success } from "zod";



// Create a Course Data
const createCourse = async (req, res) =>{
    const {course} = req.body;
    const result = await CourseServices.createCourse(course);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course created successfully",
        data: result,
    })
    
}


// Get all course data:
const getAllCourse = async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all course successfully",
        data: result,
    })

}


// Get Single Course data:
const getSingleCourse = async (req, res) => {
    const {id} = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single course successfully",
        data: result,
    })
}


// Update Course data:
const updateCourse = async (req, res) => {
    const {id} = req.params;
    const {course} = req.body;
    const result = await CourseServices.updateCourseIntoDB(id as string, course);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course data successfully updated",
        data: result,
    })
}



// Delete course data:
const deleteCourse = async (req, res) => {
    const {id} = req.params;
    const result = await CourseServices.deleteCourseFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Deleted course successfully",
        data: result,
    })
}



export const CourseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse
}