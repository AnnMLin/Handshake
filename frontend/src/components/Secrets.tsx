import React, { useState, useEffect } from 'react';
import Secret from './Secret';
import AddSecret from './AddSecret';
import { Context } from '../lib/context';
import Experiment from "../lib/experiments";

type Props = {
  ctx: Context;
}

type State = boolean

export default function Secrets(props: Props) {
  const userId = props.ctx.userId;

  const [inSaveSecretsExp, setInSaveSecretsExp] = useState<State>(false);


  // Save Secrets Experiment
  const saveSecretsExp = new Experiment(userId, "save_secrets_exp");
  useEffect(() => {
    const { isEnabled } = saveSecretsExp.activate();
    if(isEnabled) {
      setInSaveSecretsExp(true)
    }
  }, []);

  if(inSaveSecretsExp) {
    return (
      <>
        <AddSecret ctx={props.ctx}/>
        <div className='secrets-list'>
          {[...Array(25)].map(n => <Secret />)}
        </div>
      </>
    );
  }

  return (
    <>
      <div className='secrets-list'>
        {[...Array(25)].map(n => <Secret />)}
      </div>
      <AddSecret ctx={props.ctx}/>
    </>
  );
}
