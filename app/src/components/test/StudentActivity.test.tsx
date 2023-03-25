/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import StudentActivity from "../StudentActivity";

describe("<StudentActivity />", () => {
  it("renders correctly", async () => {
    render(<StudentActivity firstName={'Rick'} lastName={'Sanchez'} checkInTime={'2025-06-30 04:22:33'}/>)
    const student = await screen.findByTestId('student-activity')
    expect(student.children.length).toBe(3)
    expect(student.children[0]).toHaveTextContent('Rick')
    expect(student.children[1]).toHaveTextContent('Sanchez')
    expect(student.children[2]).toHaveTextContent('2025-06-30 04:22:33')
  });
});
