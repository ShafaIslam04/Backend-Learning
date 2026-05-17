import express, { type Request, type Response } from "express";
import { pool } from "./db";
import { useRoute } from "./modules/user/user.route";

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Shafa",
  });
});
app.use("/api/user", useRoute);

export default app;
