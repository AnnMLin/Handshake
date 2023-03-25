import Students from "../students";
import axios from "axios";

jest.mock("axios");

const mockStudent1 = {
  id: 1,
  first_name: "Peter",
  last_name: "Griffin",
  check_in_time: "2023-03-21 12:23:34",
};

const mockStudent2 = {
  id: 2,
  first_name: "Brian",
  last_name: "Griffin",
  check_in_time: "2023-03-21 12:25:34",
};

const mockStudent3 = {
  id: 3,
  first_name: "Jerry",
  last_name: "Smith",
  check_in_time: "2023-03-23 12:25:34",
};

describe("Students class", () => {
  describe("getStudents method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("makes axios GET calls to /index endpoint", async () => {
      const get =jest
        .spyOn(axios, "get")
        .mockResolvedValue({
          status: 200,
          data: [mockStudent1, mockStudent2, mockStudent3],
        });

        const students = await Students.getStudents()
        expect(get).toHaveBeenCalled()
        expect(students).toHaveLength(3)
    });
  });
});
