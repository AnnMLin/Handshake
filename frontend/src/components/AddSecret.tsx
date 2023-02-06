import React from "react";
import analytics from "../lib/analytics";
import { addSecretButton, click } from "../util/const";
import { Context } from "../lib/context";

type Props = {
  ctx: Context;
};

export default function AddSecret(props: Props) {
  const userId = props.ctx.userId;

  const addSecret = function () {
    analytics.log(userId, addSecretButton, click);
  };

  return <button onClick={addSecret}>Add Secret</button>;
}
