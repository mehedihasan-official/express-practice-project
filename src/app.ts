import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.send("Practice Project Backend is running...");
}

app.get("/", getAController);

export default app;
