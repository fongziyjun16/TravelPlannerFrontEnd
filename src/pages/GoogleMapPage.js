import { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '90%',
  left: '48%',
};

class GoogleMapPage extends Component {
    state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},         // Shows the InfoWindow to the selected place upon a marker
      PlacesList: [{latitude: 34.0522, longitude: -118.2437},
                   {latitude: 35.0522, longitude: -118.2437},
                   {latitude: 34.0522, longitude: -117.2437}]
    };

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
          this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    displayMarkers = () => {
      return this.state.PlacesList.map((eachPlace, index) => {
        return ([
            <Marker
              key={index} 
              id={index} 
              position={{
                lat: eachPlace.latitude,
                lng: eachPlace.longitude
              }}
              onClick={this.onMarkerClick}
              name="selected Place!"
            />,
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>
        ])
      })
    }

    render() {
        return (
          <>
            
            <Map
              google={this.props.google}
              zoom={12}
              style={mapStyles}
              initialCenter={
                { lat: 34.0522, lng: -118.2437}
              }
            >
              {this.displayMarkers()}
            </Map>
          </>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCtdpUYxLPw3EnxfIy5T1G8eAUSbt41s1M'
})(GoogleMapPage);