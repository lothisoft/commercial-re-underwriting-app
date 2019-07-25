import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {InputWithLabels} from '../../molecules/inputWithLabels/InputWithLabels';

import "./AddressEditor.scss";

export const AddressEditor = (props) => {
  const address = props.address;
  return (
    <div className={classNames("organism-address-display", props.className, {"readonly":props.readonly})}>
         <InputWithLabels name="address-street" inputLabel="Street:" value={address.street} readonly={props.readonly} inputFieldType="text"/>
         <InputWithLabels name="address-city" inputLabel="City:" value={address.city} readonly={props.readonly} inputFieldType="text"/>
         <InputWithLabels name="address-state" inputLabel="State:" value={address.state} readonly={props.readonly} inputFieldType="text"/>
         <InputWithLabels name="address-zipcode" inputLabel="Zip:" value={address.zipcode} readonly={props.readonly} inputFieldType="text"/>
         <InputWithLabels name="address-county" inputLabel="County:" value={address.county} readonly={props.readonly} inputFieldType="text"/>
    </div>
  )
};

AddressEditor.propTypes = {
  address: PropTypes.shape(
    {
      street:PropTypes.string,
      city:PropTypes.string,
      state:PropTypes.string,
      zipcode:PropTypes.string,
      county:PropTypes.string,
    }
  ),
  readonly:PropTypes.bool,
  className:PropTypes.string,
};

