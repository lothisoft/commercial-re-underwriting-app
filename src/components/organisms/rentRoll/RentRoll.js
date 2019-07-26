import React from 'react';
import PropTypes from 'prop-types';

import {Input} from '../../atoms/input/Input';
import {FormattedNumberInput} from '../../atoms/formattedNumberInput/FormattedNumberInput';
import {Button} from '../../atoms/button/Button';

import "./RentRoll.scss";

class RentRollRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowNumber: props.rowNumber,
      monthlyRent:0,
      vacancyRate:0,
      annualRent:0,
      annualRentKey:Math.floor(Math.random() * Math.floor(100000000))
    };

    this.handleOnBlur =  this.handleOnBlur.bind(this);
  }

  handleOnBlur(fieldName, event) {
    // update the value that has changed and recalculate the annual rent
    const currentState = this.state;
    currentState[fieldName] = event.target.value;

    const maxAnnualRent = currentState.monthlyRent * 12;
    const vacancyLoss = maxAnnualRent * currentState.vacancyRate;
    const newAnnualRent = maxAnnualRent - vacancyLoss;
    currentState["annualRent"] = newAnnualRent;
    currentState["annualRentKey"] =Math.floor(Math.random() * Math.floor(100000000));  // update the key to force a redraw of the annual rent input field
    this.setState(currentState);

    this.props.onChange && this.props.onChange(this.state.rowNumber, {annualRent: newAnnualRent});
  }

  render() {
    return [
      <Input name="unitNumber"  className="text-input" key={this.state.rowNumber} />,
      <FormattedNumberInput name="monthlyRent" key={this.state.rowNumber+1} format="$0,0.00" onBlur={(event)=>{this.handleOnBlur("monthlyRent", event)}}/>,
      <FormattedNumberInput name="vacancyRate" key={this.state.rowNumber+2} format="0.0%" required={true} onBlur={(event)=>{this.handleOnBlur("vacancyRate", event)}}/>,
      <FormattedNumberInput name="numberBedrooms" key={this.state.rowNumber+3} format="0,0"/>,
      <FormattedNumberInput name="numberBathrooms"key={this.state.rowNumber+4} className="number-of-bedrooms" format="0,0"/>,
      <FormattedNumberInput name="annualRent" key={this.state.annualRentKey} format="$0,0.00" value={this.state.annualRent} readonly={true}/>
        ];
  }
}

RentRollRow.propTypes = {
  onChange:PropTypes.func,
  rowNumber:PropTypes.number,
};

export class RentRoll extends React.Component {
  constructor() {
    super();
    this.state = {
      rentRoll: [0],
      totalAnnualRent:0,
      totalAnnualRentKey:Math.floor(Math.random() * Math.floor(100000000))
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.addRowHandler = this.addRowHandler.bind(this);
  }

  handleOnChange(rowNumber, rentRowValue) {
    const currentRentRoll = this.state.rentRoll;
    currentRentRoll[rowNumber] = rentRowValue.annualRent;

    let totalAnnualRent = 0;
    currentRentRoll.forEach((rowAnnualRent) => {
      totalAnnualRent += rowAnnualRent;
    });

    this.setState({rentRoll:currentRentRoll,
      totalAnnualRent,
      totalAnnualRentKey:Math.floor(Math.random() * Math.floor(100000000))});

    this.props.onChange && this.props.onChange(totalAnnualRent);
  }


  renderRentRollRows() {
    return this.state.rentRoll.map((_, index) => {
      return (
        <RentRollRow key={index} rowNumber={index} onChange={this.handleOnChange}/>
      )}
      );
  };


  addRowHandler() {
    const currentRentRoll = this.state.rentRoll;
    currentRentRoll.push(0);
    this.setState({rentRoll: currentRentRoll});
  }

  render() {
    return (
      <div className="organism-rent-roll">
        <h2 key="1">
          Rent Roll
        </h2>
        <Button key={"Add Button"} className="add-row-button" onClick={this.addRowHandler}>Add Row</Button>
        <div key="2" className="rent-roll-container">
              <div className="rent-roll-column-header rent-roll-unit-number">
                <strong>Unit</strong>
              </div>
              <div className="rent-roll-column-header rent-roll-monthly-rent">
                Monthly Rent ($)
              </div>
              <div className="rent-roll-column-header rent-roll-vacancy-rate">
                Vacancy Rate (%)
              </div>
              <div className="rent-roll-column-header rent-roll-number-bedrooms">
                Number of Bedrooms
              </div>
              <div className="rent-roll-column-header rent-roll-number-bathrooms">
                Number of Bathrooms
              </div>
              <div className="rent-roll-column-header rent-roll-annual-rent">
                Annual Rent ($)
              </div>

          {this.renderRentRollRows()}

          <div className="rent-roll-column-footer rent-roll-unit-number">

          </div>
          <div className="rent-roll-column-footer rent-roll-monthly-rent">

          </div>
          <div className="rent-roll-column-footer rent-roll-vacancy-rate">

          </div>
          <div className="rent-roll-column-footer rent-roll-number-bedrooms">

          </div>
          <div className="rent-roll-column-footer rent-roll-number-bathrooms">

          </div>
          <div className="rent-roll-column-footer rent-roll-annual-rent">
            <FormattedNumberInput name="annualRent" key={this.state.totalAnnualRentKey} format="$0,0.00" value={this.state.totalAnnualRent} readonly={true}/>
          </div>
        </div>
      </div>
    );
  }
}

RentRoll.propTypes = {
  onChange:PropTypes.func
};

