import { QueryBuilder } from "../../builder/QueryBueld";
import { CourseSearchableFields } from "./course.constant";
import { Course } from "./course.model";

const createCourse = async () => {
  const result = await Course.create();
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<Coures>) => {
  const result = await Course.findByIdAndUpdate(id, payload);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourse,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
