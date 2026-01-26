import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
// api/v1/students/create-student
app.use("/api/v1", router);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Practice Project Backend is running...");
});

// Not Found middleware (must be after all routes)
app.use(notFound);

// Global Error Handler (must be last)
app.use(globalErrorhandler);

export default app;