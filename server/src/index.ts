import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database("./analytics.sqlite");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS experiments( user_id INTEGER NOT NULL, experiment_name TEXT NOT NULL, experiment_group TEXT NOT NULL, experiment_start_dt TEXT NOT NULL)",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
});
const corsOpt: cors.CorsOptions = {
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
  const { userId, experimentName } = req.body;

  await db.get(
    "SELECT experiment_group FROM experiments WHERE experiment_name = ? AND user_id = ?",
    [experimentName, userId],
    async (err, data) => {
      if (err) {
        throw err;
      }

      const experimentGroup = data ? data.experiment_group : null;

      if (experimentGroup) {
        return res.json({ experimentGroup });
      } else {
        const experimentGroup = userId % 2 ? "enabled" : "control";
        await db.run(
          "INSERT INTO experiments(user_id, experiment_name, experiment_group, experiment_start_dt) VALUES ( ?, ?, ?, datetime('now'))",
          [userId, experimentName, experimentGroup],
          (err) => {
            if (err) {
              throw err;
            }
          }
        );

        return res.json({ experimentGroup });
      }
    }
  );
});

app.listen({ port: 8081 });
