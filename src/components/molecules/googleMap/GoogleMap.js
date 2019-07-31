import React from 'react'
import PropTypes from 'prop-types';

export class GoogleMap extends React.Component {
  constructor() {
    super();

    this.googleMapRef = React.createRef();
    this.myref = {};
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  componentDidMount() {
    /*global google*/
    this.googleMap = new google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: this.props.position.lat,
        lng: this.props.position.lng
      },
      disableDefaultUI: true,
    });

    /*global google*/
    this.marker = new google.maps.Marker({
      position: {
        lat: this.props.position.lat,
        lng: this.props.position.lng
      },
      map: this.googleMap,
    });
  }

  render() {
    console.log("GoogleMap.render():", this.googleMapRef);
    return (<div
        className="molecule-google-map"
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '300px', height: '300px' }}
      />
    )
  }
}

GoogleMap.propTypes = {
  position:PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom:PropTypes.number
};

