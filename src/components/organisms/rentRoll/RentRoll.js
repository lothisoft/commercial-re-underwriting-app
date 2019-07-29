import React from 'react';
import PropTypes from 'prop-types';

import {Input} from '../../atoms/input/Input';
import {FormattedNumberInput} from '../../atoms/formattedNumberInput/FormattedNumberInput';
import {Button} from '../../atoms/button/Button';

import "./RentRoll.scss";


/**
 * The component RentRollRow represent one row of a rent roll.  The rent roll keeps track of the annual rent income for the row.
 */
class RentRollRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowNumber: props.rowNumber,
      monthlyRent:0,
      vacancyRate:0,
      annualRent:0,
      annualRentKey:Math.floor(Math.random() * Math.floor(100000000))  //random value for the key, used to force a repaint of the component
    };

    this.handleOnBlur =  this.handleOnBlur.bind(this);
  }

  /**
   * handleOnBlur() is called by all financially relevant fields (monthly rent, vacancy rate) when they lose the input focus
   * in order to recalculate the annual rent income.
   * @param fieldName
   * @param event
   */
  handleOnBlur(fieldName, event) {
    // update the value that has changed and recalculate the annual rent
    const currentState = this.state;
    currentState[fieldName] = event.target.value;

    const maxAnnualRent = currentState.monthlyRent * 12;
    const vacancyLoss = maxAnnualRent * currentState.vacancyRate;
    const newAnnualRent = maxAnnualRent - vacancyLoss;
    currentState["annualRent"] = newAnnualRent;
    currentState["annualRentKey"] = Math.floor(Math.random() * Math.floor(100000000));  // update the key to force a redraw of the annual rent input field
    this.setState(currentState);

    // tell the parent that the annual rent income has changed
    this.props.onChange && this.props.onChange(this.state.rowNumber, {annualRent: newAnnualRent});
  }

  render() {
    return [
            <Input name="unitNumber"  className="text-input" key={this.state.rowNumber} />,
            <FormattedNumberInput name="monthlyRent" key={this.state.rowNumber+1} format="$0,0.00" onBlur={(event)=>{this.handleOnBlur("monthlyRent", event)}}/>,
            <FormattedNumberInput name="vacancyRate" key={this.state.rowNumber+2} format="0.0%" required={true} onBlur={(event)=>{this.handleOnBlur("vacancyRate", event)}}/>,
            <FormattedNumberInput name="numberBedrooms" key={this.state.rowNumber+3} format="0,0"/>,
            <FormattedNumberInput name="numberBathrooms" key={this.state.rowNumber+4} className="number-of-bedrooms" format="0,0"/>,
            <FormattedNumberInput name="annualRent" key={this.state.annualRentKey} format="$0,0.00" value={this.state.annualRent} readonly={true}/>
        ];
  }
}

RentRollRow.propTypes = {
  onChange:PropTypes.func,
  rowNumber:PropTypes.number,
};


/**
 * The component RentRoll implements the Rent Roll functionality.  It allows the user to enter one or more rent roll data rows.
 * The component keeps track of and display the total annual rent income for all rows that are displayed
 */
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

  /**
   * handleOnChange() is called every time a rent roll row changes a financially relevant value and it receives
   * the updated annual rent fot the row.  The annual rent row total for each row is tracked is this component and
   * the grand total is maintained here as well
   * @param rowNumber
   * @param rentRowValue
   */
  handleOnChange(rowNumber, rentRowValue) {
    //get the current rent roll, update it with the rent from the changed row
    const currentRentRoll = this.state.rentRoll;
    currentRentRoll[rowNumber] = rentRowValue.annualRent;

    // calculate the total
    let totalAnnualRent = 0;
    currentRentRoll.forEach((rowAnnualRent) => {
      totalAnnualRent += rowAnnualRent;
    });

    // update the state
    // changing the annual rent key with a random number causes the component to repaint
    this.setState({rentRoll:currentRentRoll,
      totalAnnualRent,
      totalAnnualRentKey:Math.floor(Math.random() * Math.floor(100000000))});

    // and tell the parent the new annjual rent total
    this.props.onChange && this.props.onChange(totalAnnualRent);
  }


  /**
   * renderRentRollRows renders all the rent roll rows
   * @returns {*[]}
   */
  renderRentRollRows() {
    return this.state.rentRoll.map((_, index) => {
      return (
        <RentRollRow key={index} rowNumber={index} onChange={this.handleOnChange}/>
      )}
      );
  };

  /**
   * addRowHandler is called when the user clicks the Add Row button.  It adds a new entry to the state for the new rent row
   */
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

          <div className="rent-roll-column-footer rent-roll-unit-number" />
          <div className="rent-roll-column-footer rent-roll-monthly-rent" />
          <div className="rent-roll-column-footer rent-roll-vacancy-rate" />
          <div className="rent-roll-column-footer rent-roll-number-bedrooms" />
          <div className="rent-roll-column-footer rent-roll-number-bathrooms" />
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

