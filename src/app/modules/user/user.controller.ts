import { NextFunction, Request, Response } from "express";
import { error } from "console";
import { userDataService } from "./user.service";


//Create Student::
const createStudentIntoDB = async(req: Request, res: Response, next: NextFunction) => {
    try{
         const {password, student: studentData} = req.body;

         //call service layer
         const result = await userDataService.createStudentIntoDB(password, studentData);

         res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: result
         })

    }catch(err){
        next(err);
}
}

export const UserController = {
    createStudentIntoDB
}