import { NextFunction, Request, Response } from "express";


const globalErrorhandler = (err: any, req: Request, res: Response, next:NextFunction)=> {
    const statuseCode = 500;
    const message = err.message || 'Something went wrong';
    return res.status(statuseCode).json({
      success: false,
      message,
      error: err
    })
  }

  export default globalErrorhandler;