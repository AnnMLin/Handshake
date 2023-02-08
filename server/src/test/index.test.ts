import request from "supertest";
import app, { server } from "../index";
import db from "../db";

describe("Express app", () => {
  afterAll(() => {
    db.close();
    server.close();
  });

  describe("POST /loggings endpoint", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes a POST call to database and respond with success message", async () => {
      const body = {
        userId: 7,
        component: "TEST_COMPONENT",
        action: "TEST_ACTION",
      };

      const post = jest.spyOn(db, "run");

      const res = await request(app).post("/loggings").send(body);
      expect(post).toHaveBeenCalled();
      expect(res.body.success).toBeTruthy();
    });

    it("sends a 400 response when request body is missing required key(s)", async () => {
      const body = {
        component: "TEST_COMPONENT",
        action: "TEST_ACTION",
      };

      const post = jest.spyOn(db, "run");

      await request(app).post("/loggings").send(body).expect(400);
      expect(post).not.toHaveBeenCalled();
    });
  });

  describe("POST /experiments endpoint", () => {
    beforeEach(async () => {
      await db.run("DELETE FROM frontend_loggings WHERE user_id = 78");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("responds with success message", async () => {
      const body = {
        userId: 77,
        experimentName: "TEST_EXP",
        experimentGroup: 'enabled',
      };

      const get = jest.spyOn(db, "get");
      const post = jest.spyOn(db, "run");

      const res = await request(app).post("/experiments").send(body);
      expect(res.body.success).toBeTruthy();
    });

    it("makes a GET call to database", async () => {
      const body = {
        userId: 77,
        experimentName: "TEST_EXP",
        experimentGroup: 'enabled',
      };

      const get = jest.spyOn(db, "get");

      await request(app).post("/experiments").send(body);
      expect(get).toHaveBeenCalled();
    });

    it("makes a POST call to database for new experiment activations", async () => {
      const body = {
        userId: 78,
        experimentName: "TEST_EXP",
        experimentGroup: 'enabled',
      };

      const post = jest.spyOn(db, "run");

      await request(app).post("/experiments").send(body);
      expect(post).toHaveBeenCalled();
    });

    it("sends a 400 response when request body is missing required key(s)", async () => {
      const body = {
        experimentName: "TEST_EXP",
      };

      const get = jest.spyOn(db, "get");

      await request(app).post("/experiments").send(body).expect(400);
      expect(get).not.toHaveBeenCalled();
    });
  });
});
