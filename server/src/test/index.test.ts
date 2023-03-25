import request from "supertest";
import app, { server } from "../index";
import db from "../db"

describe("Express app", () => {
  afterAll(() => {
    db.close();
    server.close();
  });

  describe("GET /index enpoint", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes a GET call to database", async() => {
      const get = jest.spyOn(db, "all")

      await request(app).get("/index")
      expect(get).toHaveBeenCalled()
    })

    it("responds with 200 status code", async() => {
      const res = await request(app).get("/index")
      expect(res.status).toBe(200);
    })
  })
});
