import analytics from "../analytics";
import axios from "axios";

jest.mock("axios");

const testUserId = 111;

describe("Analytics class", () => {
  describe("log method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios POST calls", async () => {
      const post = jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: { success: true } });
      await analytics.log(testUserId, "BUTTON", "CLICK");

      expect(post).toHaveBeenCalled();
    });
  });
});
