import cors from "cors";
import express, {
  NextFunction,
  type Application,
  type Request,
  type Response,
} from "express";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// api/v1/students/student-create
//application routes
app.use("/api/v1", router);


const test = (req: Request, res: Response) => {
  res.send("Practice Project Backend is running...");
};

app.get("/", test);

app.use(globalErrorhandler)

//Not Found(here will be middleware)
app.use(notFound);


export default app;
