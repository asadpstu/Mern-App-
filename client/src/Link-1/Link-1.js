import React, { Component } from 'react';
import {Col,Form,Button,InputGroup,Container,Alert } from 'react-bootstrap';
import axios from 'axios';

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
        console.log(firstname);
        console.log(lastname);
        console.log(username);
        console.log(city);
        console.log(state);
        console.log(zip);
        const helloFromApi = axios
                             .get('/users')
                             .then(res => res.data);
        console.log(helloFromApi);                     

      }

    }
    render() {
      const { validated } = this.state;
    return (
      <div className="Link-1">

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
              defaultValue="" name="firstname" 
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
              name="lastname" 
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
                name="username" 
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
             name="city"
             onChange={this.handleChange} 
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required name="state" 
            onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required name="zip" 
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


      </div>
    );
  }
}

export default Link1;
