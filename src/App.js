import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import './App.css';

function Home() {
    return (
        <>
            <h2>Home</h2>
            <Link to="/gh">GitHub</Link>
        </>
    );
}

function Validate(props) {
    const { source, path } = props;
    
    const prefix = path.match.path;
    const file = path.location.pathname.substring(prefix.length);
    return (
        <>
            <h2>{source}</h2>
            <Link to="/">Home</Link>
            
            <p>{file}</p>
        </>
    );
}

export default function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/gh">
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
