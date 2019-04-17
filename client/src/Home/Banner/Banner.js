import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import logo1 from './banner1.jpg';
import logo2 from './banner2.jpg';
import logo3 from './banner3.jpg';

class Banner extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          index: 0,
          direction: null,
        };
    }
    
    handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction,
        });
    }

    render() {
      const { index, direction } = this.state;
    return (
      <div className="Banner">

      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>React Carousel - 1 </h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>React Carousel - 2 </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={logo3}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>React Carousel - 3 </h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        
        
      </Carousel>

      </div>
    );
  }
}

export default Banner;
