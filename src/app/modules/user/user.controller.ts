import { NextFunction, Request, Response } from "express";
import { error } from "console";
import { userDataService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


//Create Student::
const createStudentIntoDB = async(req: Request, res: Response, next: NextFunction) => {
    try{
         const {password, student: studentData} = req.body;

         //call service layer
         const result = await userDataService.createStudentIntoDB(password, studentData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result
        })

         
    }catch(err){
        next(err);
}
}

export const UserController = {
    createStudentIntoDB
}