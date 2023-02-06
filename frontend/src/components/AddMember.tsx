import React from 'react';
import analytics from '../lib/analytics';
import { addMemberButton, view, click } from '../util/const';
import { Context } from '../lib/context';

type Props = {
  ctx: Context;
}

export default function AddMember(props: Props) {
  const userId = props.ctx.userId;

  const addMember = function() {
    analytics.track('Members.Add');
    analytics.log(userId, addMemberButton, click);
  };

  return (
    <button onClick={addMember}>Add Member</button>
  );
}
