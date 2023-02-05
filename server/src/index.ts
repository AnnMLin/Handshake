import express, { Request, Response } from "express";
import cors from "cors";
import db from "./db";

const app = express();

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

app.post("/loggings", async (req: Request, res: Response) => {
  const { userId, component, action } = req.body;

  await db.run(
    "INSERT INTO frontend_loggings(user_id, component, action, dt) VALUES ( ?, ?, ?, datetime('now'))",
    [userId, component, action],
    (err) => {
      if (err) {
        throw err;
      }
      return res.json({ success: true });
    }
  );
});

app.listen({ port: 8081 });
