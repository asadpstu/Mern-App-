import React, { Component } from 'react';
import { Form,Button,Container,Col,Row } from "react-bootstrap";
import axios from 'axios';



class Signup extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confPassword: '',
    };
    
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastname, email,password,confPassword } = this.state;

    if (password === confPassword) 
    { 
        axios.post('/user/login/registration/create-account', {
        "firstname": firstname, 
        "lastname": lastname,
        "email": email, 
        "password": password, 
        })
        .then(function (response) {
          if(response.data.result === "FALSE"){
            alert('Please try with other information')
          }
          else
          {
           alert('Registration succesfully!')  
           this.props.history.push('/signin');          
          }

        }.bind(this))
        .catch(function (error) {
          alert('Unexpected Error -'+error);
        });
    }
    else
    {
      alert('Please provide same password')
    }

  }


  render() {
    
    return (
      <div className="form-group" >
      <Container >
      <Row>
        <Col></Col>
        <Col xs={6}>
            <Form onSubmit={this.handleSubmit}>
              <br/>
              <h2>Registration Form</h2>
              <Form.Group controlId="formBasicName">
                <Form.Label>First name</Form.Label>
                <Form.Control name="firstname" type="text" placeholder="Enter full name" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastname" type="text" placeholder="Enter last name" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConf">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control name="confPassword" type="confPassword" placeholder="Confirm Password" onChange={this.handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>                
        </Col>
        <Col></Col>
      </Row>

        </Container>
    </div>
    );
  }
}

export default Signup;
