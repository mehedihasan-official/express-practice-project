
import { userDataService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


//Create Student::
const createStudentIntoDB = catchAsync(async(req, res, next) => {
   
         const {password, student: studentData} = req.body;

         //call service layer
         const result = await userDataService.createStudentIntoDB(password, studentData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result
        })

})

export const UserController = {
    createStudentIntoDB
}