import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { StudentRoutes } from "./modules/student/student.route";

const app: Application = express();



//parsers
app.use(express.json());
app.use(cors());


// api/v1/students/student-create
//application routes
app.use("/api/v1/students", StudentRoutes)

const getAController = (req: Request, res: Response) => {
  res.send("Practice Project Backend is running...");
}

app.get("/", getAController);

export default app;
