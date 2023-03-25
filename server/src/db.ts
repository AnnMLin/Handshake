import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS students( id INTEGER NOT NULL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, check_in_time TEXT NOT NULL)",
        (err: Error) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  }
});

export default db;
