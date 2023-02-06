import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./analytics.sqlite");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS experiments( user_id INTEGER NOT NULL, experiment_name TEXT NOT NULL, experiment_group TEXT NOT NULL, experiment_start_dt TEXT NOT NULL)",
    (err: Error) => {
      if (err) {
        throw err;
      }
    }
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS frontend_loggings( user_id INTEGER NOT NULL, component TEXT NOT NULL, action TEXT NOT NULL, dt TEXT NOT NULL)",
    (err: Error) => {
      if (err) {
        throw err;
      }
    }
  );
});

export default db;
