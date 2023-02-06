import React, { useState, useEffect } from "react";
import Members from "./Members";
import Secrets from "./Secrets";
import { Context } from "../lib/context";
import analytics from "../lib/analytics";
import "../css/Tabs.css";
import Experiment from "../lib/experiments";
import { secretsTab, membersTab, view } from "../util/const";

type State = {
  showSecrets: boolean;
  showMembers: boolean;
};

type Props = {
  ctx: Context;
};

export default function Tabs(props: Props) {
  const userId = props.ctx.userId;

  const [state, setState] = useState<State>({
    showSecrets: true,
    showMembers: false,
  });

  function showSecrets(): void {
    setState({ showSecrets: true, showMembers: false });
    analytics.track("Secrets.Show");
    analytics.log(userId, secretsTab, view);
  }

  function showMembers(): void {
    setState({ showSecrets: false, showMembers: true });
    analytics.track("Members.Show");
    analytics.log(userId, membersTab, view);
  }

  // Add Members Experiment
  const addMemberExp = new Experiment(userId, "add_members_exp");
  useEffect(() => {
    const { isEnabled: inAddMemberExp } = addMemberExp.activate();
    if (inAddMemberExp) {
      showMembers();
    }
  }, []);

  return (
    <div id="tabs">
      <ul id="links">
        <li className={state.showSecrets ? "active" : ""}>
          <a onClick={showSecrets}>Secrets</a>
        </li>
        <li className={state.showMembers ? "active" : ""}>
          <a onClick={showMembers}>Members</a>
        </li>
      </ul>

      <div
        data-testid={"secrets-tab"}
        className={`tab ${state.showSecrets ? "" : "hidden"}`}
      >
        <Secrets />
      </div>

      <div
        data-testid={"members-tab"}
        className={`tab ${state.showMembers ? "" : "hidden"}`}
      >
        <Members ctx={props.ctx} />
      </div>
    </div>
  );
}
