import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import title from './title.jpg';
import axios from 'axios';
import {Container} from 'react-bootstrap';
//import ReactDOM from 'react-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data: []
        }
     }

  componentDidMount() {
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

  render() {
    const { data } = this.state;

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
                            <h5>{object.firstname}</h5>
                            <p>Last name :{object.lastname}</p>
                            <p>User name :{object.username}</p>
                            <p>User City - {object.city} State - {object.state} City Zip Code -{object.zip}</p>

                            </Media.Body>
                        </Media>
                        

                    </ul>
                </div>
               
            ))}

          </div>                  
        </Container>

      </div>
    );
  }
}

export default Dashboard;
