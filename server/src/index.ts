import { Request, Response } from "express";
import { CorsOptions } from "cors";
import db from "./db";
const express = require("express");
const cors = require("cors");

type Data = {
  experiment_group: string;
};

const app = express();

const corsOpt: CorsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(express.json());
app.use(cors(corsOpt));

app.post("/events", async (req: Request, res: Response) => {
  const name = req.body.name;
  const timestamp = new Date().getTime();

  await db.run(
    "INSERT INTO events (name, timestamp) VALUES (?, datetime('now'))",
    [name]
  );
  return res.json({ success: true });
});

app.post("/experiments", async (req: Request, res: Response) => {
  const { userId, experimentName, experimentGroup } = req.body;
  if (!userId || !experimentName || !experimentGroup) {
    return res.status(400).send("Request body incomplete");
  }
  await db.get(
    "SELECT user_id FROM experiments WHERE experiment_name = ? AND user_id = ? AND experiment_group = ?",
    [experimentName, userId, experimentGroup],
    async (err: Error, data: Data) => {
      if (err) {
        throw err;
      }
      if (!data) {
        await db.run(
          "INSERT INTO experiments(user_id, experiment_name, experiment_group, experiment_start_dt) VALUES ( ?, ?, ?, datetime('now'))",
          [userId, experimentName, experimentGroup],
          (err: Error) => {
            if (err) {
              throw err;
            }
          }
        );
      }
      return res.json({ success: true });
    }
  );
});

app.post("/loggings", async (req: Request, res: Response) => {
  const { userId, component, action } = req.body;
  if (!userId || !component || !action) {
    return res.status(400).send("Request body incomplete");
  }
  await db.run(
    "INSERT INTO frontend_loggings(user_id, component, action, dt) VALUES ( ?, ?, ?, datetime('now'))",
    [userId, component, action],
    (err: Error) => {
      if (err) {
        throw err;
      }
      return res.json({ success: true });
    }
  );
});

app.listen({ port: 8081 });

export default app;
