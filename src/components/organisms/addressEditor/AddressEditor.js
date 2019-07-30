import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {InputWithLabels} from "../../molecules/inputWithLabels/InputWithLabels";

import "./AddressEditor.scss";

export class AddressEditor extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      readonly: props.readonly,
      address: props.address,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
   }

  /**
   * handleOnChange is called every time an address field is edited
   * @param fieldName
   * @param event
   */
   handleOnChange(fieldName, event) {
     this.props.onChange && this.props.onChange(fieldName, event);
   }

   render () {
     return (
       <div className={classNames("organism-address-editor", {"viewing": this.state.readonly}, {"editing": !this.state.readonly})} >
        <InputWithLabels inputFieldName="street" inputFieldType="text" inputLabel="Street: " value={this.state.address.street} onBlur = {(event) => {return this.handleOnChange("street",event)}} readonly={this.state.readonly} />
        <InputWithLabels inputFieldName="city" inputFieldType="text" inputLabel="City: " value={this.state.address.city} onBlur={(event) => {return this.handleOnChange("city",event)}} readonly={this.state.readonly} />
        <InputWithLabels inputFieldName="state" inputFieldType="text" inputLabel="State: " value={this.state.address.state} onBlur={(event) => {return this.handleOnChange("state",event)}} readonly={this.state.readonly} />
        <InputWithLabels inputFieldName="zip" inputFieldType="text" inputLabel="Zip: " value={this.state.address.zip} onBlur={(event) => {return this.handleOnChange("zip",event)}} readonly={this.state.readonly} />
        <InputWithLabels inputFieldName="county" inputFieldType="text" inputLabel="County: " value={this.state.address.county} onBlur={(event) => {return this.handleOnChange("county",event)}} readonly={this.state.readonly} />
       </div>)
     ;
   }
}

AddressEditor.propTypes = {
  address:PropTypes.shape(
    {
      street:PropTypes.string,
      city:PropTypes.string,
      state:PropTypes.string,
      zip:PropTypes.string,
      county:PropTypes.string,
    }
  ),
  readonly:PropTypes.bool,
  className:PropTypes.string,
  onChange:PropTypes.func
};
