import React from 'react';


import {GooglePlacesAutoComplete} from "../../molecules/googlePlacesAutoComplete/GooglePlacesAutoComplete";

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

      annualRent:0,
      expenses:0,
      noi:0,
    };


    this.handleOnPlaceSelected = this.handleOnPlaceSelected.bind(this);
    this.handleRentRowChange = this.handleRentRowChange.bind(this);
    this.handleExpenseChange = this.handleExpenseChange.bind(this);

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

    const propertyAddress={};
    propertyAddress.street = `${interimAddress.street_number} ${interimAddress.route}`;
    propertyAddress.city = interimAddress.sublocality_level_1;
    propertyAddress.state = interimAddress.administrative_area_level_1;
    propertyAddress.zipcode = interimAddress.postal_code;
    propertyAddress.county = interimAddress.administrative_area_level_2;

    this.setState({propertyAddress});
  }

  handleRentRowChange(annualRent) {
    let noi = this.state.annualRent - this.state.expenses;
    this.setState({annualRent, noi});
  }

  handleExpenseChange(expenses) {
    let noi = this.state.annualRent - this.state.expenses;
    this.setState({expenses, noi});
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

         </div>
       </div>
    );
  }
};
