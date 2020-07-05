import React from "react";
import * as Forms from "./comps/forms";
import LandingPage from './pages/landing_page'
import NotFound from './pages/notfound_page'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">

      <Router>        
        <Switch>   
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Forms.Login} />
          <Route path="/signup" component={Forms.Signup} />
          <Route component={NotFound} />
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
