import { Request, Response } from "express";
import { error } from "console";
import { userDataService } from "./user.service";


//Create Student::
const createStudentIntoDB = async(req: Request, res: Response) => {
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
        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error
        })
    }
}

export const UserController = {
    createStudentIntoDB
}