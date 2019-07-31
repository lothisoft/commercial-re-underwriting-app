import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import Search Bar Components
import {Input} from "../../atoms/input/Input.js";

import "./GooglePlacesAutoComplete.scss";

export class GooglePlacesAutoComplete extends React.Component {
  constructor() {
    super();

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  /**
   * the Google Places API is instantiated here for the Google Places Autocomplete
   */
  componentDidMount() {
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
