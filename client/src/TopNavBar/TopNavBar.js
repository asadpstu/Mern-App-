import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
/* [withRouter] is related to changing content of navbar with local storage value */ 
import { Navbar,Nav,Form} from 'react-bootstrap';



class TopNavBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };

  }

  logout =(e) =>{
    localStorage.removeItem('hastoken');
    this.props.history.push('/');  
  }
  



  render() {
    
    const notlogin =(
      <Form inline>
      <Nav.Link  as={NavLink} to='/signup' >Sign-up</Nav.Link>
      <Nav.Link  as={NavLink} to='/signin' >Sign-in</Nav.Link>  
      </Form>
    )

    const alreadylogin =(
      <Form inline>
      <Nav.Link  as={NavLink} to='/' >Profile</Nav.Link>
      <Nav.Link  as={NavLink} onClick={this.logout} >Logout</Nav.Link>  
      </Form>
    )


    return (
      <div className="Top-Nav-Bar">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand  as={NavLink} to='/'  >Mern App</Navbar.Brand>
          <Nav className="mr-auto">
          { localStorage.hastoken ? 
            <Nav.Link  as={NavLink} to='/dashboard' >Dashboard</Nav.Link> 
            : 
            '' 
          }
          { localStorage.hastoken ? 
            <Nav.Link  as={NavLink} to='/add-record' >Add Record</Nav.Link> 
            : 
            '' 
          }
            
            
            <Nav.Link  as={NavLink} to='/Issue' >Post Issue</Nav.Link>
            <Nav.Link  as={NavLink} to='/link-3' >News-letter</Nav.Link>

          </Nav>
          
          
          { localStorage.hastoken ? alreadylogin : notlogin }
          
          
        </Navbar>
      </div>
    );
  }
}

export default withRouter(TopNavBar);
