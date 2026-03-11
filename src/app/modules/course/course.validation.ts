import z from "zod/v3";


const PreRequisiteCourseValidationSchema = z.object({
  course: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),

    prefix: z.string({
      required_error: 'Prefix is required',
    }),

    code: z.number({
      required_error: 'Code is required',
    }),

    credits: z.number({
      required_error: 'Credits is required',
    }),

    preRequisiteCourses: z
      .array(PreRequisiteCourseValidationSchema)
      .optional(),

    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});



export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};