import React from 'react';
import PropTypes from 'prop-types';

import {Button} from "../../atoms/button/Button";
import {InputWithLabels} from "../../molecules/inputWithLabels/InputWithLabels";


import "./MortgageTerms.scss";

const MTerm = (props) => {

  // here, the order of values and the format used to displayed them is defined
  const mortgageTermsValueNames = [
    {name:"Agency", displayName:"Agency: ", type:"text"},
    {name:"Type", displayName:"Type: ", type:"text"},
    {name:"NOI", displayName:"NOI: ", type:"number", format:"$0,0.00"},
    {name:"75% LTV Proceeds", displayName:"75% LTV Proceeds: ", type:"number", format:"$0,0.00"},
    {name:"Interest Rate", displayName:"Interest Rate: ", type:"number", format:"0.00%"},
    {name:"Debt Constant", displayName:"Debt Constant: ", type:"number", format:"0.0%"},
    {name:"Annual Debt Service", displayName:"Annual Debt Service: ", type:"number", format:"$0,0"},
    {name:"Years", displayName:"Years: ", type:"number", format:"0,0"},
    {name:"# Payments", displayName:"Number of Payments: ", type:"number", format:"0,0"},
    {name:"Payoff", displayName:"Payoff: ", type:"number", format:"$0,0.00"},
    {name:"Proceeds", displayName:"Proceeds: ", type:"number", format:"$0,0.00"},
  ];

  //  iterate over the above array and display the values in the order and manner they are mentioned above
  return (<div className="term-sheet">
    {mortgageTermsValueNames.map((valueNameProperties, index) => {
      return (
        <InputWithLabels key={index}
                         inputFieldName={valueNameProperties.name}
                         inputLabel={valueNameProperties.displayName}
                         value={props.terms[valueNameProperties.name]}
                         inputFieldType={valueNameProperties.type}
                         inputFieldNumberFormat={valueNameProperties.format}
                         readonly={true}
                          className="Avenir-LT-Std-65-Medium"/>
      )})}
    </div>
  );
};

MTerm.propTypes = {
  terms:PropTypes.object,
};


/**
 * The component
 */
export class MortgageTerms extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       showAll:false,
     };

     this.handleShowAllClick = this.handleShowAllClick.bind(this);
  }

  /**
   * handleShowAllClick() is called when the user clicks on the show all button
   */
  handleShowAllClick() {
    this.setState({
      termsToShow: this.props.terms,
      showAll: true
    });
  }

  render() {
    let termsToShow;
    if (this.props.visible) {
      if (this.state.showAll) {
        termsToShow = this.props.terms;
      } else {
        termsToShow  = this.props.terms.slice(0,3);
      }
      return (
        <div className={"organism-mortgage-terms Avenir-LT-Std-65-Medium"}>
          <h2 className="mortgage-term-header" >
            Mortgage Terms {!this.state.showAll && <Button className={"show-all Avenir-LT-Std-65-Medium"} onClick={this.handleShowAllClick} disabled={this.state.showAll}>Show All</Button>}
          </h2>

          <div className={"mortgage-terms-display"}>
            {termsToShow.map((term) => {
              return <MTerm key={Math.random()} terms={term}/>
            })}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

MortgageTerms.propTypes = {
  visible:PropTypes.bool,
  terms:PropTypes.array,

};
