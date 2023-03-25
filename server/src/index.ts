import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import db from "./db";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  check_in_time: string;
};

const app = express();

const corsOpt: CorsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(express.json());
app.use(cors(corsOpt));

app.get("/index", async (req: Request, res: Response) => {
  const sql = "SELECT * FROM students";
  const params: any = [];
  db.all(sql, params, (err: Error, rows: Array<Student>) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      return res.status(200).json(rows);
    }
  });
});

export const server = app.listen({ port: 8081 });

export default app;
