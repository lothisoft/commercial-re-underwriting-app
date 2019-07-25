import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Import Search Bar Components
import {Input} from "../../atoms/input/Input.js";

//Import React Script Library to load Google object
import Script from 'react-load-script';

import "./GooglePlacesAutoComplete.scss";

const googlePlacesAPIKey = "AIzaSyAoaBjtaYgGEN4IP4X06fC70v7AM4cexgc";

export class GooglePlacesAutoComplete extends React.Component {

  // Define Constructor
  constructor() {
    super();

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  /**
   * handleScriptLoad() is called once the thrid party javascript file has been loaded
   */
  handleScriptLoad() {
    const options = {types: ['address'], ComponentRestrictions:{country: ["us"]}};
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('googlePlacesAutoComplete'), options);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  /**
   * handlePlaceSelect() is called when a user has selected an address
   */
  handlePlaceSelect() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceSelected && this.props.onPlaceSelected(place);
  }

  shouldComponentUpdate() {
    // this component is controlled by the Google Maps Places Autocomplete API, React should never update it
    return false;
  }

  render() {
    return (
      <div className={classNames('google-places-auto-complete', this.props.className)}>
        <Script url={`https://maps.googleapis.com/maps/api/js?key=${googlePlacesAPIKey}&libraries=places`}
                onLoad={this.handleScriptLoad}
        />
        <Input id="googlePlacesAutoComplete"
               name="googlePlacesAutoComplete"
               placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

GooglePlacesAutoComplete.propTypes = {
  placeholder:PropTypes.string,
  onPlaceSelected:PropTypes.func,
  className:PropTypes.string,
  value:PropTypes.string
};
