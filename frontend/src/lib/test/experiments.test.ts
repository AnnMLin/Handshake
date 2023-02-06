import Experiment from "../experiments";
import axios from "axios";

jest.mock("axios");

describe("Experiment class", () => {
  describe("activate method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios POST calls", async () => {
      const exp = new Experiment("TEST_EXPERIMENT");
      jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: { experimentGroup: "enabled" } });
      const inExp = await exp.activate();

      expect(inExp).toEqual({ isEnabled: true });
    });
  });
});
