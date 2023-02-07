/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Secrets from "../Secrets";

jest.mock("../../css/App.css", () => {});
jest.mock("../../css/index.css", () => {});
jest.mock("../../css/Members.css", () => {});
jest.mock("../../css/Secret.css", () => {});
jest.mock("../../css/Tabs.css", () => {});
jest.mock("axios");

describe("<Secrets />", () => {
  it("renders Add Secret button at top for enabled users", async () => {
    const mockContext = {
      userId: 123,
    };

    const { container } = render(<Secrets ctx={mockContext} />);

    expect(container.firstChild).toHaveTextContent("Add Secret");
  });

  it("renders default view for control users", async () => {
    const mockContext = {
      userId: 12,
    };

    const { container } = render(<Secrets ctx={mockContext} />);

    expect(container.lastChild).toHaveTextContent("Add Secret");
  });
});
