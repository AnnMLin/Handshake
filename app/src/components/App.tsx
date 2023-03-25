import React, { createContext } from "react";
import '../css/app.css'
import StudentActivities  from "./StudentActivities";

export default function App() {

  return (
    <div id ="app">
      <h1>Handshake</h1>
      <StudentActivities />
    </div>
  )
}
