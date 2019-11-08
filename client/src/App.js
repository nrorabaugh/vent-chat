import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import InRoom from './components/InRoom'
import Rooms from './components/Rooms'
import NewRoom from'./components/NewRoom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/rooms" component={Rooms}/>
          <Route exact path="/newRoom" component={NewRoom}/>
          <Route exact path="/rooms/:id" component={InRoom}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
