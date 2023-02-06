import React, { useEffect } from 'react';
import analytics from '../lib/analytics';
import { addMemberButton, view, click } from '../util/const';

export default function AddMember() {
  const addMember = function() {
    analytics.track('Members.Add');
    analytics.log(addMemberButton, click);
  };

  useEffect(() => {
    analytics.log(addMemberButton, view);
  }, [])

  return (
    <button onClick={addMember}>Add Member</button>
  );
}
