import React, { Component } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Home from './Home/Home'
import Link1 from './Link-1/Link-1';
import Issue from './Issues/Issue';

import Signup from './TopNavBar/signup/signup';
import Signin from './TopNavBar/signin/signin';
import Dashboard from './Dashboard/Dashboard';
import AllVisitor from './All-Visitor/AllVisitor';
import { Route, BrowserRouter } from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <TopNavBar />
          <Route  exact path='/' component={Home} />
          <Route  exact path='/dashboard' component={Dashboard} />  
          <Route  exact path='/add-record' component={Link1} /> 
          <Route  exact path='/Issue' component={Issue} />            
          <Route  exact path='/signup' component={Signup} />
          <Route  exact path='/signin' component={Signin} />
          <Route  exact path='/All-Visitor' component={AllVisitor} />
          
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
