import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './Home';
import Validate from './Validate';

export default function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/gh" render={(props) => (
                <Validate 
                    source="GitHub" 
                    path={props} 
                />
            )}/>
        </Switch>
    </Router>
  );
}
