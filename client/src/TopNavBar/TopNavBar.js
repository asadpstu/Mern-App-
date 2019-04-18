import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import Signin from './signin/signin';
import Signup from './signup/signup';


class TopNavBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className="Top-Nav-Bar">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand  as={NavLink} to='/home'  >Mern App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link  as={NavLink} to='/' >Dashboard</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-1' >Post New</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-2' >Link-2</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-3' >Link-3</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-4' >Link-4</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-5' >Link-5</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Signup />
            <Signin />
            
          </Form>
        </Navbar>

        <signup />
        <signin />
      </div>
    );
  }
}

export default TopNavBar;
