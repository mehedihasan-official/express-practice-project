
import { CourseServices } from "./course.service";
import  httpStatus, { status }  from 'http-status';
import { STATUS_CODES } from "node:http";
import { success } from "zod";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";



// Create a Course Data
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});

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
  const { id } = req.params;

  const result = await CourseServices.updateCourseIntoDB(
    id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course data successfully updated",
    data: result,
  });
};



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


const assignFaculties = async (req, res) => {
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties assigned to course successfully",
        data: result,
    })
}



export const CourseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFaculties
}