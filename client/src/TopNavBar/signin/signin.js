import React, { Component } from 'react';
import { Form,Button,Container,Col,Row } from "react-bootstrap";
import axios from 'axios';



class Signin extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      password: '',

    };
    
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email,password } = this.state;

    if (password) 
    { 
        axios.post('/user/login/registration/login', {
        "email": email, 
        "password": password, 
        })
        .then(function (response) {
          if(response.data.result === "FALSE"){
            alert('Please try with other information')
          }
          else
          {
           //alert('Login successfull!');
           localStorage.setItem('hastoken',response.data.result);  
           this.props.history.push('/dashboard');          
          }

        }.bind(this))
        .catch(function (error) {
          alert('Unexpected Error -'+error);
        });
    }
    else
    {
      alert('Please provide all info!')
    }

  }

  render() {
    return (
      <div className="form-group">
      <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
            <Form onSubmit={this.handleSubmit}>
              <br/>
              <h2>Login Form</h2>
              

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                  Provide email that you used for registration 
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
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

export default Signin;
