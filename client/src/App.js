import React, { Component } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Home from './Home/Home'
import Link1 from './Link-1/Link-1';
import Dashboard from './Dashboard/Dashboard';
import { Route, BrowserRouter } from 'react-router-dom';






class App extends Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <TopNavBar />
          <Route  exact path='/' component={Dashboard} />
          <Route  exact path='/home' component={Home} />
          <Route  path='/link-1' component={Link1} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
