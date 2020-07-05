import React from "react";
import * as Forms from "./comps/forms";

function App() {
  return (
    <div className="App">
      <Forms.Login />
      <Forms.Signup />
      <Forms.PostNewTimer />
      <Forms.UpdateTimer />
    </div>
  );
}

export default App;
