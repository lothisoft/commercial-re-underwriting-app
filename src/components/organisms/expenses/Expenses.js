import React from 'react';
import PropTypes from 'prop-types';

import {InputWithLabels} from '../../molecules/inputWithLabels/InputWithLabels';

import "./Expenses.scss";

/**
 * The Expenses component displays the input fields for expenses.  Every field which is editable notifies this component
 * when it loses the cursor focus in order to calculate the the total
 */
export class Expenses extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expenses:{},
      totalExpenses:0,
      totalExpensesKey:Math.floor(Math.random() * Math.floor(100000000))
    };

    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  /**
   * handleOnBlur() is called when any editable field loses it's input focus.  It's get's all the current values from
   * the component state, adds all expenses up, updates the state with the new value, the new total and generates a new
   * key for the Total Expenses field.  Changng the key of this read-only field, causes React to repaint the Total Expenses
   * field and the new Total is displayed.
   * @param fieldName
   * @param blurResult
   */
  handleOnBlur(fieldName, blurResult) {

    // update the expense which has just changed
    const expenses = this.state.expenses;
    expenses[fieldName] = blurResult.value;

    // an calculate the new expense total
    let totalExpenses = 0;
    const expenseCategories = Object.keys(expenses);
    expenseCategories.forEach((categoryName) => {
      totalExpenses += expenses[categoryName];
    });

    // update the total expense input field
    // changing the key of a component causes React to repaint the control
    const totalExpensesKey = Math.floor(Math.random() * Math.floor(100000000));
    this.setState({expenses, totalExpenses, totalExpensesKey});
    // and tell the parent about the new expense total
    this.props.onChange && this.props.onChange(totalExpenses);
  }

  render() {
    return (
      <div className="organism-expenses">
        <h2>
          Expenses (annual in US-$)
        </h2>
        <InputWithLabels  inputFieldName="marketing"  inputLabel="Marketing" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("marketing", event)}}/>
        <InputWithLabels  inputFieldName="taxes"  inputLabel="Taxes" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("taxes", event)}}/>
        <InputWithLabels  inputFieldName="insurance"  inputLabel="Insurance" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("insurance", event)}}/>
        <InputWithLabels  inputFieldName="repairs"  inputLabel="Repairs" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("repairs", event)}}/>
        <InputWithLabels  inputFieldName="administration"  inputLabel="Administration" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("administration", event)}}/>
        <InputWithLabels  inputFieldName="payroll"  inputLabel="Payroll" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("payroll", event)}}/>
        <InputWithLabels  inputFieldName="utility"  inputLabel="Utility" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("utility", event)}}/>
        <InputWithLabels  inputFieldName="management"  inputLabel="Management" inputFieldType="number" inputFieldNumberFormat="$0,0.00" onBlur={(event)=>{this.handleOnBlur("management", event)}}/>

        <InputWithLabels  key={this.state.totalExpensesKey} inputFieldName="totalExpenses"  inputLabel="Total Expenses" inputFieldType="number" inputFieldNumberFormat="$0,0.00" value={this.state.totalExpenses} readonly={true}/>
      </div>
    );
  }
}

Expenses.propTypes = {
  onChange: PropTypes.func
};

