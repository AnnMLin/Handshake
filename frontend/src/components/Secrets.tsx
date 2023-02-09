import React, { useState, useEffect, useContext } from 'react';
import Secret from './Secret';
import AddSecret from './AddSecret';
import { Context } from '../lib/context';
import { ExperimentContext } from "./App"

type Props = {
  ctx: Context;
  show: boolean;
}

export default function Secrets(props: Props) {

  const [inSaveSecretsExp, setInSaveSecretsExp] = useState<boolean>(false);
  const [showSecrets, setShowSecrets] = useState<boolean>(true)

  const { saveSecretsExp } = useContext(ExperimentContext)

  useEffect(() => {
    setShowSecrets(props.show);
    // Only activating users into experiment if user can actually view the Secrets page to avoid dilution
    if(!showSecrets && props.show) {
      const { isEnabled } = saveSecretsExp.activate();
      if(isEnabled) {
        setInSaveSecretsExp(true);
      }
    }
  }, [props.show]);

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
