import cors from "cors";
import express, {
  NextFunction,
  type Application,
  type Request,
  type Response,
} from "express";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// api/v1/students/student-create
//application routes
app.use("/api/v1/students", StudentRoutes);

app.use("/api/v1/users", UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Practice Project Backend is running...");
};

app.get("/", getAController);

//Not Found(here will be middleware)
app.use((err: any, req: Request, res: Response, next:NextFunction)=> {
  const statuseCode = 500;
  const message = err.message || 'Something went wrong';
  return res.status(statuseCode).json({
    success: false,
    message,
    error: err
  })
})


export default app;
