import React from 'react';
import PropTypes from 'prop-types';

const googlePlacesAPIKey = "AIzaSyAoaBjtaYgGEN4IP4X06fC70v7AM4cexgc";

/**
 * GoogleApiLoader is a utility component which ensures that the Google Places API is loaded once for each page.  If each
 * component loads the Google API independently, the dreaded "google maps api loaded multiple times on this page" will
 * appear and the components that depend on the Google Places API won't work
 */
export class GoogleApiLoader extends React.Component {

  /**
   * The Google Places API is loaded and the onScriptLoaded() function is called to alert the parent component that the
   * Google Places API is loaded
   */
  componentDidMount() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googlePlacesAPIKey}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      /*global google*/
      this.props.onScriptLoaded && this.props.onScriptLoaded(google);
    });
  };

  /**
   * This component has no representation
   * @returns {*}
   */
  render() {
    return null;
  }
}

GoogleApiLoader.propTypes = {
  onScriptLoaded: PropTypes.func.isRequired
};