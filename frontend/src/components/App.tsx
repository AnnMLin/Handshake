import React from 'react';
import Tabs from './Tabs';
import '../css/App.css';
import { Context, getContext } from '../lib/context';

export default function App() {
  const ctx: Context = getContext();

  return (
    <div id="page">
      <h1>
        <span className="project">server</span>
        <span className="arrow">{'>'}</span>
        prod
      </h1>
      <div id="main">
        <Tabs ctx={ctx}/>
      </div>
    </div>
  );
}
