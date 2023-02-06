import Experiment from "../experiments";
import axios from "axios";

jest.mock("axios");
jest.mock("../context", () => ({
  getContext: jest.fn(() => ({ userId: 111 })),
}));

describe("Experiment class", () => {
  describe("activate method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios POST calls", async () => {
      const exp = new Experiment("TEST_EXPERIMENT");
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
      const exp = new Experiment("TEST_EXPERIMENT");
      const post = jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: { success: true } });
      await exp.saveActivation();

      expect(post).toHaveBeenCalled();
    });
  });
});
