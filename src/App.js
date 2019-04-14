import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import Banner from './Banner/Banner'
import './App.css';

class App extends Component {
  state = {
    personlist : [
      {"name" : "X-Men 1","roll":"10","reg":"xr-01" ,"id":1},
      {"name" : "X-Men 2","roll":"15","reg":"xr-02" ,"id":2},
      {"name" : "X-Men 3","roll":"20","reg":"xr-03" ,"id":3},
    ]
  }
  addPersonFunction = (paramReceived) =>{
    
    paramReceived.id = Math.random();
    console.log(paramReceived.id);
    console.log(paramReceived);  
    var addedPerson = [...this.state.personlist,paramReceived];
    console.log(addedPerson);
    
    this.setState(
      {
        personlist : addedPerson
      }
    )

  }

  deletePerson = (id) =>{
    var myArr = this.state.personlist;
    var index = myArr.findIndex(function(o){
        return o.id === id;
    })
    if (index !== -1) myArr.splice(index, 1);
    
    this.setState(
      {
        personlist : myArr
      }
      )


  }

  render() {
    return (
      <div className="App">
        <Navbar addPerson ={this.addPersonFunction}   />        
        <Banner personlist = {this.state.personlist} delPerson={this.deletePerson}/>

      </div>
    );
  }
}

export default App;
