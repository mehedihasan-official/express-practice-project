import { Request, Response } from "express";
import { productValidationSchema } from "../validations/product.validation";
import { ProductService } from "../services/product.services";

/**
 * Create a new product
 * POST /api/products
 */
const createProduct = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Validate request body using Zod
    const validatedData = productValidationSchema.parse(req.body);

    // 2️⃣ Call service layer
    const result = await ProductService.createProductIntoDB(validatedData);

    // 3️⃣ Send success response
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    // Zod validation error
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    }

    // Duplicate product / service errors
    res.status(500).json({
      success: false,
      message: error.message || "Product creation failed",
    });
  }
};

export const ProductController = {
  createProduct,
};
