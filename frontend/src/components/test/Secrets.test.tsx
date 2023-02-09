/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Secrets from "../Secrets";
import { ExperimentContext, ExperimentContextType } from "../App";
import Experiment from "../../lib/experiment";
import { Context } from "../../lib/context";

jest.mock("../../css/App.css", () => {});
jest.mock("../../css/index.css", () => {});
jest.mock("../../css/Members.css", () => {});
jest.mock("../../css/Secret.css", () => {});
jest.mock("../../css/Tabs.css", () => {});
jest.mock("axios");

const mockExperiments = (userId: number) => ({
  addMembersExp: new Experiment(userId, "add_members_exp"),
  saveSecretsExp: new Experiment(userId, "save_secrets_exp"),
});

const wrapper = (
  mockContext: Context,
  mockExperimentContext: ExperimentContextType,
  show: boolean
) => (
  <ExperimentContext.Provider value={mockExperimentContext}>
    <Secrets ctx={mockContext} show={false} />
  </ExperimentContext.Provider>
);

describe("<Secrets />", () => {
  it("renders Add Secret button at top for enabled users", async () => {
    const mockContext = {
      userId: 123,
    };

    const mockExperimentContext = mockExperiments(mockContext.userId);

    const { container, rerender } = render(
      wrapper(mockContext, mockExperimentContext, false)
    );

    rerender(
      <ExperimentContext.Provider value={mockExperimentContext}>
        <Secrets ctx={mockContext} show={true} />
      </ExperimentContext.Provider>
    );

    expect(container.firstChild).toHaveTextContent("Add Secret");
  });

  it("renders default view for control users", async () => {
    const mockContext = {
      userId: 12,
    };

    const mockExperimentContext = mockExperiments(mockContext.userId);

    const { container, rerender } = render(
      wrapper(mockContext, mockExperimentContext, false)
    );

    rerender(
      <ExperimentContext.Provider value={mockExperimentContext}>
        <Secrets ctx={mockContext} show={true} />
      </ExperimentContext.Provider>
    );

    expect(container.lastChild).toHaveTextContent("Add Secret");
  });

  it("does not activate user into experiment if user is not viewing Secret tab", async () => {
    const mockContext = {
      userId: 12,
    };

    const mockExperimentContext = mockExperiments(mockContext.userId);

    mockExperimentContext.saveSecretsExp.activate = jest.fn(() => ({
      isEnabled: false,
    }));

    render(wrapper(mockContext, mockExperimentContext, false));

    expect(
      mockExperimentContext.saveSecretsExp.activate
    ).not.toHaveBeenCalled();
  });
});
