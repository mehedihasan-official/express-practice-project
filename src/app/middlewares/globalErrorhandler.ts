import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateIDError from "../errors/handleDuplicateIDError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  let statusCode: number = err?.statusCode ?? 500;
  let message: string = err?.message ?? "Something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // ✅ Zod Error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  }

  // ✅ Mongoose Validation Error
  else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  }

  // ✅ Mongoose Cast Error
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  }

  // ✅ Duplicate Key Error
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateIDError(err);

    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  }

  // ✅ Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode ?? 400;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  // ✅ Native Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message ?? "Something went wrong";
    errorSources = [
      {
        path: "",
        message,
      },
    ];
  }

  // 🔐 Final Safe Response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;