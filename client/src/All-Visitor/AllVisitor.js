import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import axios from 'axios';


class AllVisitor extends Component {
    //Default location
    constructor(props){
        super(props);
        this.state = {
            locationData: [],
            position : []
        };
        this.state = {
            lat: 3.0738,
            lng: 101.5183,
            zoom: 7,
            location: ''
          }; 
          
            
    }

    componentDidMount(){
      axios.get(`https://api.ipdata.co/?api-key=test`)
      .then(res => {
        const lat = res.data.latitude;
        const lng = res.data.longitude;
        const location = res.data.city;
        this.setState({
            'lat' : lat,
            'lng' : lng,
            'location':location,
        });
        
      })

      this.recall();
    }
    
    recall = (e) =>{
        axios.get('/location')
        .then(response => 
            {
                    if (response.status === 200 && response != null) 
                    {
                    const locationJsonData = response.data.location;
                    if(Array.isArray(locationJsonData))
                     {  
                        var length = locationJsonData.length;
                        var defaultSetLocation = Math.ceil(length/2); 
                        console.log(defaultSetLocation);
                        this.setState({
                            locationData : locationJsonData,
                            position : [locationJsonData[defaultSetLocation].lat, locationJsonData[defaultSetLocation].lng]
                        });
                        

                     }
                    
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
    const { locationData } = this.state;
    
    
        
    const iconMarkup = renderToStaticMarkup(
        <i className="fa fa-map-pin fa-3x" />
      );
    const customMarkerIcon = divIcon({
        html: iconMarkup
      });
      
      

    
    if(Array.isArray(locationData))
    { 
            var marker =(
               locationData.map(item => (
                <Marker 
                    key={item.name}
                    icon={customMarkerIcon}
                    position={[item.lat,item.lng]}>
                    <Popup>
                        {'Country: ' + item.country + ' - City: '+  item.name}
                    </Popup>
                </Marker>

              ))
                

        ); 

    }

  

    return (
      <div className="AllVisitor">

        
            <Map className="map" center={this.state.position} zoom={this.state.zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marker}  
                              
            </Map>                 
            

      </div>
    );
  }
}

export default AllVisitor;
