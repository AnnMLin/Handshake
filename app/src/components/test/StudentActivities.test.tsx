/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import StudentActivities from "../StudentActivities";

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

jest.mock("../../lib/students", () => {
  return {
    getStudents: jest.fn().mockImplementation(() => {
      return Promise.resolve([mockStudent1, mockStudent2, mockStudent3]);
    }),
  };
});

describe("<StudentActivities />", () => {
  it("renders correctly", async () => {
    render(<StudentActivities />);
    const table = await screen.findByTestId("check-in-table");
    const activities = await screen.findAllByTestId("student-activity");
    expect(table).toBeVisible();
    expect(activities).toHaveLength(3);
  });
});
