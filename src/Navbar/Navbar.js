import React, { Component } from 'react';


class Navbar extends Component {
  state = {
    name : null,
    roll : null,
    reg : null
  }

  width = {
    'width': '100%',
    'margin': '5px'
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
    this.props.addPerson(this.state);
  }


  
  render() {
    return (
      <div className="Navbar">
        <div>Just Form </div>
        <form onSubmit={this.handleSubmit}>
          <div style={this.width}>
            <label htmlFor="username">Enter username</label>
            <input id="name"  type="text" onChange={this.handleChange}/>
          </div>
            
          <div style={this.width}>
            <label htmlFor="email">Enter your Roll</label>
            <input id="roll"  type="text" onChange={this.handleChange}/>
          </div>
          
          <div style={this.width}>
            <label htmlFor="birthdate">Enter your Reg</label>
            <input id="reg"  type="text" onChange={this.handleChange}/>
          </div>
            

          <button>Send data!</button>
        </form>
        
      </div>
    );
  }
}

export default Navbar;
