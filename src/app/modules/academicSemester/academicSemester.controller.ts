import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterDataServices } from "./academicSemester.services";

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    // call service layer
    const result =
      await AcademicSemesterDataServices.createAcademicSemesterIntoDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is created successfully",
      data: result,
    });
  },
);

// get all academic semester controller function here:
const getAllAcademicSemestersFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterDataServices.getAllAcademicSemestersFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester retrived successfully",
      data: result,
    });
  },
);

// get single academic semester controller function here:
const getSingleAcademicSemesterFromDb = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterDataServices.getSingleAcademicSemesterFromDb(
        req.params.id as string,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Academic data retrive successfully",
      data: result,
    });
  },
);

// Update academic semester controller function here:
const updateAcademicSemesterIntoDb = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await AcademicSemesterDataServices.updateAcademicSemesterIntoDb(
        id as string,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester Updated successfully",
      data: result,
    });
  },
);

// Delete academic semester controller function here:
const deleteAcademicSemesterFromDb = catchAsync(
    async(req: Request, res: Response) => {
        const {id} = req.params;
        const result = await AcademicSemesterDataServices.deleteAcademicSemesterFromDb(id as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Semester Deleted Successfully",
            data: result,
        })
    }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemestersFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
  deleteAcademicSemesterFromDb,
};
