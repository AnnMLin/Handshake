/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Tabs from "../Tabs";

jest.mock("../../css/App.css", () => {});
jest.mock("../../css/index.css", () => {});
jest.mock("../../css/Members.css", () => {});
jest.mock("../../css/Secret.css", () => {});
jest.mock("../../css/Tabs.css", () => {});
jest.mock("axios");

describe("<Tabs />", () => {
  it("renders Members tab for enabled users", async () => {
    const mockContext = {
      userId: 123,
    };

    render(<Tabs ctx={mockContext} />);

    const secretsTab = await screen.findByTestId("secrets-tab");
    const membersTab = await screen.findByTestId("members-tab");

    expect(secretsTab).toHaveClass("tab hidden");
    expect(membersTab).toHaveClass("tab");
  });

  it("renders Secrets tab for control users", async () => {
    const mockContext = {
      userId: 12,
    };

    render(<Tabs ctx={mockContext} />);

    const secretsTab = await screen.findByTestId("secrets-tab");
    const membersTab = await screen.findByTestId("members-tab");

    expect(secretsTab).toHaveClass("tab");
    expect(membersTab).toHaveClass("tab hidden");
  });
});
