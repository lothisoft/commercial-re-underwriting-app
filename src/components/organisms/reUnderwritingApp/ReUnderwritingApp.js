import React from 'react';

import {InputWithLabels} from "../../molecules/inputWithLabels/InputWithLabels";
import {GooglePlacesAutoComplete} from "../../molecules/googlePlacesAutoComplete/GooglePlacesAutoComplete";
import {Button} from "../../atoms/button/Button";

import {AddressEditor} from "../addressEditor/AddressEditor";
import {AddressDisplay} from "../addressDisplay/AddressDisplay";
import {RentRoll} from "../rentRoll/RentRoll";
import {Expenses} from "../expenses/Expenses";

import "./ReUnderwritingApp.scss";

export class ReUnderwritingApp extends React.Component {
  constructor() {
    super();

    this.state = {
      propertyAddress:{},
      addressFieldsReadOnly:true,
      addressSearchValue:"",

      income:0,
      expenses:0,
      noi:0,
      noiKey: Math.floor(Math.random() * Math.floor(100000000))
    };


    this.handleOnPlaceSelected = this.handleOnPlaceSelected.bind(this);
    this.handleRentRowChange = this.handleRentRowChange.bind(this);
    this.handleExpenseChange = this.handleExpenseChange.bind(this);
    this.submit = this.submit.bind(this);

  }

  handleOnPlaceSelected(place) {
    this.setState({addressSearchValue:place.formatted_address});

    const interimAddress = {};
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      interimAddress[addressType] = place.address_components[i].long_name;
    }

    const address={};
    address.street = `${interimAddress.street_number} ${interimAddress.route}`;
    address.city = interimAddress.sublocality_level_1;
    address.state = interimAddress.administrative_area_level_1;
    address.zip = interimAddress.postal_code;
    address.county = interimAddress.administrative_area_level_2;

    this.setState({address});
  }

  handleRentRowChange(income) {
    let noi = income - this.state.expenses;
    this.setState({income, noi, noiKey: Math.floor(Math.random() * Math.floor(100000000))});
  }

  handleExpenseChange(expenses) {
    let noi = this.state.income - expenses;
    this.setState({expenses, noi, noiKey: Math.floor(Math.random() * Math.floor(100000000))});
  }

  submit() {
    console.log("Submit");
  }

  render() {
    return (
       <div className="re-underwriting-app Avenir-LT-Std-95-Black">
         <div className="container">
          <h1>
            Commercial Real Estate Underwriting
          </h1>
          <GooglePlacesAutoComplete placeholder="Please enter a location"
                                    onPlaceSelected={this.handleOnPlaceSelected}
                                    value={this.state.addressSearchValue}/>
           {!this.state.addressFieldsReadOnly &&
            <AddressEditor address={this.state.propertyAddress} readonly={this.state.addressFieldsReadOnly}/>}
           {this.state.addressFieldsReadOnly &&
            <AddressDisplay address={this.state.propertyAddress} /> }

           <RentRoll onChange={this.handleRentRowChange}/>

           <Expenses onChange={this.handleExpenseChange} />

           <InputWithLabels key={this.state.noiKey} name={"noi"}
                            inputFieldName="noiDisplay"
                            inputLabel="Net Operating Income (NOI)"
                            value={this.state.noi}
                            inputFieldType="number"
                            inputFieldNumberFormat="$0,0.00"
                            readonly={true}
                            className="noi-display"/>

           <InputWithLabels name={"capRate"}
                            inputFieldName="capRate"
                            inputLabel="Capitalization Rate (in %)"
                            inputFieldType="number"
                            inputFieldNumberFormat="0.0%"
                            className="cap-rate"/>

           <Button onClick={this.submit}>Submit</Button>

         </div>
       </div>
    );
  }
}
