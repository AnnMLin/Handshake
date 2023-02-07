import Experiment from "../experiment";
import axios from "axios";

jest.mock("axios");

const testUserId = 111;
const testExpName = "TEST_EXPERIMENT";

describe("Experiment class", () => {
  describe("activate method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios POST calls", async () => {
      const exp = new Experiment(testUserId, testExpName);
      jest.spyOn(axios, "post").mockResolvedValue({ data: { success: true } });
      const inExp = await exp.activate();
      expect(inExp).toEqual({ isEnabled: true });
    });
  });

  describe("saveActivation method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios POST calls", async () => {
      const exp = new Experiment(testUserId, testExpName);
      const post = jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: { success: true } });
      await exp.saveActivation();

      expect(post).toHaveBeenCalled();
    });
  });
});
