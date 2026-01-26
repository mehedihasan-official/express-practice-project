import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod/v3";


const validationRequest = (schema : AnyZodObject) =>{ return async( req: Request, res: Response, next: NextFunction) => {

    try{
        // validation check
    // if everything alright then next() ->
    await schema.parseAsync({
        body: req.body
});

 next();
    } catch(err){
        next(err)
    }
    
}}

export default validationRequest