import React, { Component } from 'react';
import TopNavBar from './TopNavBar/TopNavBar';
import Home from './Home/Home'
import Link1 from './Link-1/Link-1';
import Signup from './TopNavBar/signup/signup';
import Signin from './TopNavBar/signin/signin';
import Dashboard from './Dashboard/Dashboard';
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
          <Route  exact path='/signup' component={Signup} />
          <Route  exact path='/signin' component={Signin} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
