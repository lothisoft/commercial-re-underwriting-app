import React from 'react'
import PropTypes from 'prop-types';

import "./GoogleMap.scss";

export class GoogleMap extends React.Component {
  constructor() {
    super();

    this.googleMapRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  componentDidMount() {
    /*global google*/
    this.googleMap = new google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom || 16,
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
    return (<div
        className="molecule-google-map"
        id="google-map"
        ref={this.googleMapRef}
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

