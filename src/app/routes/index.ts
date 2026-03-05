import { Router } from "express";
import { academicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { CourseRoutes } from "../modules/course/course.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoute,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoute,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoute,
  },
  {
    path: "/courses",
    route: CourseRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
