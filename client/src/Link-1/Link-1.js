import React, { Component } from 'react';
import {Col,Form,Button,InputGroup,Container,Alert } from 'react-bootstrap';
import axios from 'axios';
import Dialog from 'react-bootstrap-dialog'
//import { Redirect } from 'react-router';


class Link1 extends Component {

    constructor(...args) {
      super(...args);

      this.state = { validated: false }
      this.state = {
        firstname: '',
        lastname: '',
        username: '',
        city: '',
        state: '',
        zip: ''
      };
      this.state ={ getResponse : ''};
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        console.clear();
      }
      this.setState({ validated: true });
      if (form.checkValidity() === true) {
        event.preventDefault();
        console.clear();
        const { firstname, lastname, username,city,state,zip } = this.state;
        
          axios.post('/users/insert', {
          "firstname": firstname, 
          "lastname": lastname,
          "username": username, 
          "city": city, 
          "state": state,
          "zip": zip
          })
          .then(function (response) {
            alert('Data Saved!');
          })
          .catch(function (error) {
            alert('Error!')
          });
 
      }

    }
    render() {
      const { validated } = this.state;
      const content = (
        <Container>
        <br/>
        <Alert variant="warning">
          <Alert.Heading>Post Your Data here-(Post To Mongo)</Alert.Heading>
        </Alert>


      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="" name="firstname" value={this.state.firstname}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue=""
              name="lastname"   value={this.state.lastname}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                name="username"  value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required 
             name="city"  value={this.state.city}
             onChange={this.handleChange} 
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required 
            name="state"  value={this.state.state} 
            onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required 
            name="zip"  value={this.state.zip} 
            onChange={this.handleChange}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
      </Container>
      );
    return (
      <div className="Link-1">
      
      
      <Dialog ref={(component) => { this.dialog = component }} />

      { localStorage.hastoken ? content : '' }
 

      


      </div>
    );
  }
}

export default Link1;
