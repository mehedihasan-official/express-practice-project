import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validationRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationRequest;
