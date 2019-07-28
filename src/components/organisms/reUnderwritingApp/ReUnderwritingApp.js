import React from 'react';

import {InputWithLabels} from "../../molecules/inputWithLabels/InputWithLabels";
import {GooglePlacesAutoComplete} from "../../molecules/googlePlacesAutoComplete/GooglePlacesAutoComplete";
import {Button} from "../../atoms/button/Button";

import {AddressEditor} from "../addressEditor/AddressEditor";
import {AddressDisplay} from "../addressDisplay/AddressDisplay";
import {RentRoll} from "../rentRoll/RentRoll";
import {Expenses} from "../expenses/Expenses";
import {MortgageTerms} from "../mortgageTerms/MortgageTerms";


import "./ReUnderwritingApp.scss";

export class ReUnderwritingApp extends React.Component {
  constructor() {
    super();

    this.state = {
      address:{},
      addressFieldsReadOnly:true,
      addressSearchValue:"",

      income:0,
      expenses:0,
      noi:0,
      rate:0,
      noiKey: Math.floor(Math.random() * Math.floor(100000000)),

      mortgageTerms:[],
      submitButtonDisabled:true,
    };


    this.handleOnPlaceSelected = this.handleOnPlaceSelected.bind(this);
    this.handleRentRowChange = this.handleRentRowChange.bind(this);
    this.handleExpenseChange = this.handleExpenseChange.bind(this);
    this.handleChangeCapRate = this.handleChangeCapRate.bind(this);
    this.isSubmitButtonDisabled = this.isSubmitButtonDisabled.bind(this);
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
    if (interimAddress.street_number) {
      address.street = `${interimAddress.street_number} ${interimAddress.route}`;
    } else {
      address.street = interimAddress.route;
    }
    address.city = interimAddress.sublocality_level_1;
    address.state = interimAddress.administrative_area_level_1;
    address.zip = interimAddress.postal_code;
    address.county = interimAddress.administrative_area_level_2;

    if (address.city === "Manhattan") {
      address.city = "New York";
    } else if (address.city === "The Bronx") {
      address.city = "Bronx";
    }

    this.setState({address}, this.isSubmitButtonDisabled);
  }

  handleRentRowChange(income) {
    let noi = income - this.state.expenses;
    this.setState({income, noi, noiKey: Math.floor(Math.random() * Math.floor(100000000))}, this.isSubmitButtonDisabled);
  }

  handleExpenseChange(expenses) {
    let noi = this.state.income - expenses;
    this.setState({expenses, noi, noiKey: Math.floor(Math.random() * Math.floor(100000000))}, this.isSubmitButtonDisabled);
  }

  handleChangeCapRate(capRate) {
    this.setState({rate: capRate.value}, this.isSubmitButtonDisabled);
  }

  isSubmitButtonDisabled() {
    const currentState = this.state;

    const isAddressEmpty = Object.entries(currentState.address).length === 0 && currentState.address.constructor === Object;
    const isIncomeEmpty = currentState.income === 0;
    const isExpensesEmpty = currentState.expenses === 0;
    const isNoiEmpty = currentState.noi === 0;
    const isRateEmpty = currentState.rate === 0;

    const submitButtonDisabled = isAddressEmpty || isIncomeEmpty || isExpensesEmpty || isNoiEmpty || isRateEmpty;
    this.setState({submitButtonDisabled});
    }

  async submit() {
    const {address, income, expenses, noi, rate} = this.state;
    const postRequestObject = {address, income, expenses, noi, rate};
    // eslint-disable-next-line no-console
    console.log("POST Request with the following payload:", postRequestObject);

    let responseData;
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwPGz6uQQS9IW33ASPYlcWaEtRMD8eDAK1ONg7lT2dREXpaSUYh/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequestObject)
      });
      responseData = await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console   // eslint-disable-next-line no-console
      console.error("Error caught while doing POST request: ", error);
      responseData = JSON.parse("{\"success\":true,\"terms\":[{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.02815,\"Interest Rate\":0.030150000000000003,\"Debt Constant\":0.05068961414695165,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4385908.31162146,\"Agency\":\"Fannie Mae\",\"Type\":\"5 Years Hybrid\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.03105,\"Interest Rate\":0.03305,\"Debt Constant\":0.05258767500507064,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4227606.563297642,\"Agency\":\"Fannie Mae\",\"Type\":\"7 Years Fixed\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.03415,\"Interest Rate\":0.03615,\"Debt Constant\":0.05465863730979345,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4067426.6857393067,\"Agency\":\"Freddie SBL\",\"Type\":\"5 Years Hybrid\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0364,\"Interest Rate\":0.038400000000000004,\"Debt Constant\":0.056188479327577985,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":3956682.9830698525,\"Agency\":\"Freddie SBL\",\"Type\":\"10 Years Fixed\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0364,\"Interest Rate\":0.038400000000000004,\"Debt Constant\":0.056188479327577985,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":3956682.9830698525,\"Agency\":\"Fannie Mae\",\"Type\":\"10 Years Fixed\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0264,\"Interest Rate\":0.0284,\"Debt Constant\":0.04956288276873429,\"Annual Debt Service\":222319.99999999997,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4485614.790353678,\"Agency\":\"Freddie SBL\",\"Type\":\"5 Years Hybrid\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0294,\"Interest Rate\":0.0314,\"Debt Constant\":0.05150304303071572,\"Annual Debt Service\":222319.99999999997,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4316638.142476578,\"Agency\":\"Fannie Mae\",\"Type\":\"10 Years Fixed\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0298,\"Interest Rate\":0.0318,\"Debt Constant\":0.0517648480967802,\"Annual Debt Service\":222320,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4294806.382592832,\"Agency\":\"Fannie Mae\",\"Type\":\"7 Years Fixed\"},{\"NOI\":277900,\"Value\":86304.34782608695,\"75% LTV Proceeds\":64728.26086956521,\"Treasury\":0.0314,\"Interest Rate\":0.0334,\"Debt Constant\":0.05281933394182671,\"Annual Debt Service\":222319.99999999997,\"Years\":30,\"# Payments\":360,\"Payoff\":0,\"Proceeds\":4209064.814123842,\"Agency\":\"Freddie SBL\",\"Type\":\"7 Years Fixed\"}],\"src\":{}}");
    }
    // eslint-disable-next-line no-console
    console.log("Response Data: ", responseData);
    this.setState({mortgageTerms: responseData.terms});

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
            <AddressEditor address={this.state.address} readonly={this.state.addressFieldsReadOnly}/>}
           {this.state.addressFieldsReadOnly &&
            <AddressDisplay address={this.state.address} /> }

           <RentRoll onChange={this.handleRentRowChange}/>

           <Expenses onChange={this.handleExpenseChange} />

           <InputWithLabels key={this.state.noiKey}
                            name={"noi"}
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
                            className="cap-rate"
                            onBlur={this.handleChangeCapRate}/>

           <Button onClick={this.submit} className="submit-button Avenir-LT-Std-95-Black" disabled={this.state.submitButtonDisabled}>Submit</Button>

           <MortgageTerms terms={this.state.mortgageTerms} visible={this.state.mortgageTerms.length > 0}/>
         </div>
       </div>
    );
  }
}
