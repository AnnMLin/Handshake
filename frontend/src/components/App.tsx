import React, { createContext } from "react";
import Tabs from "./Tabs";
import '../css/App.css';
import { Context, getContext } from '../lib/context';
import Experiment from "../lib/experiment";

export type ExperimentContextType = {
  addMembersExp: Experiment;
  saveSecretsExp: Experiment;
};

export const ExperimentContext = createContext<ExperimentContextType>(
  {} as ExperimentContextType
);

export default function App() {
  const ctx: Context = getContext();

  // Add Members Experiment
  const addMembersExp = new Experiment(ctx.userId, "add_members_exp");

  // Save Secrets Experiment
  const saveSecretsExp = new Experiment(ctx.userId, "save_secrets_exp");

  const experiments = {
    addMembersExp,
    saveSecretsExp,
  };

  return (
    <div id="page">
      <h1>
        <span className="project">server</span>
        <span className="arrow">{'>'}</span>
        prod
      </h1>
      <div id="main">
        <ExperimentContext.Provider value={experiments}>
          <Tabs ctx={ctx} />
        </ExperimentContext.Provider>
      </div>
    </div>
  );
}
