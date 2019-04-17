import React, { Component } from 'react';
import { Form,Button,Modal } from 'react-bootstrap';



class Signin extends Component {
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
      <div className="signin">
        <Button variant="outline-info" className="mr-sm-2" onClick={this.handleShow}>Signin</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login here -</Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <Form.Control type="text" placeholder="Email" required /><br/>
          <Form.Control type="text" placeholder="Password" required />


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Signin;
