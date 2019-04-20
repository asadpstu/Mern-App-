import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import title from './title.jpg';
import axios from 'axios';
import {Container,Form,Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {withRouter } from 'react-router-dom';

//import ReactDOM from 'react-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           data: []
        }
        
        this.state = {
            lgShow: false,
          };

        this.state = {
            _id: '',
            firstname: '',
            lastname: '',
            username: '',
            city : '',
            state : '',
            zip : '',
          }; 
             
     }

    
    
    componentDidMount() {
        if(localStorage.hastoken)
        {
         this.recall();   
        }
        
    }

    edit = object => event => {
        // Do stuff with id and event
        console.log(object);
        this.setState({ lgShow: true })
        this.setState({
            '_id' : object._id,
            'firstname' : object.firstname,
            'lastname' : object.lastname,
            'username' : object.username,
            'city' : object.city,
            'state' : object.state,
            'zip' : object.zip,
        });

      }
      
      setNewState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
      } 

    recall = (e) =>{
        axios.get('/users/all-Post')
            .then(response => 
                {
                    if (response.status === 200 && response != null) 
                    {
                    this.setState({
                        data: response.data
                    });
                    } 
                    else 
                    {
                    console.log('problem');
                    }
        })
        .catch(error => {
            console.log(error);
        });
    } 
      
    handleSubmit = (e) => {
       e.preventDefault();
       
       const {_id, firstname, lastname, username,city,state,zip } = this.state;
       axios.post('/users/update', {
        "_id": _id, 
        "firstname": firstname, 
        "lastname": lastname,
        "username": username, 
        "city": city, 
        "state": state,
        "zip": zip
        })
        .then(function (response) {
            // Data Inserted  
            this.setState({ lgShow: false });  
            this.recall();       
        }.bind(this))
        .catch(function (error) {
          alert(error)
        });
        
       
    }  

  render() {
    const { data } = this.state;
    const spanStyle ={
        'float' : 'right',
        'font-weight': 'bolder',
        'font-size' : '12px',
        'cursor' : 'pointer'
    }
    const inputMargin = {
        'margin' : '3px',
        'width' : '100%',
        'border-radius' : '3px'
    }

    let lgClose = () => this.setState({ lgShow: false });

    return (
      <div className="Dashboard">

        <Container>
          <div>
          
          { Array.isArray(data) && data.map(object => (
                
                <div>
                    <hr/>
                    <ul className="list-unstyled">
                        <Media as="li" key={object.firstname}>
                            <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={title}
                            alt="Generic placeholder"
                            />
                            <Media.Body>
                            <h5>{object.firstname} <span style={spanStyle} onClick={this.edit(object)}>Edit</span></h5>
                            <p>Last name :{object.lastname}</p>
                            <p>User name :{object.username}</p>
                            <p>User City - {object.city} State - {object.state} City Zip Code -{object.zip}</p>

                            </Media.Body>
                        </Media>
                    </ul>
                    
                    <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={lgClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    >
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                    <p>
                    First Name :   <input  type="text" name="firstname" id="firstname" placeholder="First Name" value={this.state.firstname}  style={inputMargin} onChange={this.setNewState}/>
                    </p>    
                    <p>
                    Last Name :    <input type="text" name="lastname"  id="lastname"  placeholder="Last Name"  value={this.state.lastname}  style={inputMargin} onChange={this.setNewState}/>
                    </p>
                    <p>
                    <input type="hidden" name="username"  id="username"  placeholder="User Name"  value={this.state.username}  style={inputMargin} />
                    </p>
                    <p>
                    User City :    <input type="text" name="city"      id="city"      placeholder="User City"  value={this.state.city}  style={inputMargin} onChange={this.setNewState}/>
                    </p>
                    <p>
                    State Name :    <input type="text" name="state"     id="state"     placeholder="State Name" value={this.state.state}  style={inputMargin} onChange={this.setNewState}/>
                    </p>
                    <p>
                    Zip code :    <input type="text" name="zip"       id="zip"       placeholder="Postal or Zip code" value={this.state.zip}  style={inputMargin} onChange={this.setNewState}/>
                    </p>
                    <Button type="submit" style={inputMargin}>Submit form</Button>  
                    </Modal.Body>
                    </Form>
                    </Modal>
                    

                </div>
               
            ))}

          </div>                  
        </Container>

      </div>
    );
  }
}

export default withRouter(Dashboard);
