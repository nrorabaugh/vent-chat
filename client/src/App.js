import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Rooms from './components/Rooms'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/rooms" components={Rooms}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
