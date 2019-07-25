import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import "./AddressDisplay.scss";

export const AddressDisplay = (props) => {
  return (
    <div className={classNames("organism-address-display", props.className)}>
      <div className="name-value street">
        <div className="label">
          Street:
        </div>
        <div className="value">
          {props.address.street}
        </div>
      </div>

      <div className="name-value city">
        <div className="label">
          City:
        </div>
        <div className="value">
          {props.address.city}
        </div>
      </div>

      <div className="name-value state">
        <div className="label">
          State:
        </div>
        <div className="value">
          {props.address.state}
        </div>
      </div>

      <div className="name-value zip">
        <div className="label">
          Zip Code:
        </div>
        <div className="value">
          {props.address.zipcode}
        </div>
      </div>

      <div className="name-value county">
        <div className="label">
          County:
        </div>
        <div className="value">
          {props.address.county}
        </div>
      </div>
    </div>
  );
};

AddressDisplay.propTypes = {
  address: PropTypes.shape(
    {
      street:PropTypes.string,
      city:PropTypes.string,
      state:PropTypes.string,
      zipcode:PropTypes.string,
      county:PropTypes.string,
    }
  ),
  className:PropTypes.string,
};
