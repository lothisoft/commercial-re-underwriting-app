import React from 'react';
import PropTypes from 'prop-types';

import {Button} from "../../atoms/button/Button";
import {InputWithLabels} from "../../molecules/inputWithLabels/InputWithLabels";


import "./MortgageTerms.scss";

const MTerm = (props) => {
  const mortgageTermsValueNames = [
    {name:"Agency", displayName:"Agency: ", type:"text"},
    {name:"Type", displayName:"Type: ", type:"text"},
    {name:"NOI", displayName:"NOI: ", type:"number", format:"$0,0.00"},
    {name:"75% LTV Proceeds", displayName:"75% LTV Proceeds: ", type:"number", format:"$0,0.00"},
    {name:"Interest Rate", displayName:"Interest Rate: ", type:"number", format:"0.0%"},
    {name:"Debt Constant", displayName:"Debt Constant: ", type:"number", format:"0.0%"},
    {name:"Annual Debt Service", displayName:"Annual Debt Service: ", type:"number", format:"$0,0"},
    {name:"Years", displayName:"Years: ", type:"number", format:"0,0"},
    {name:"# Payments", displayName:"Number of Payments: ", type:"number", format:"0,0"},
    {name:"Payoff", displayName:"Payoff: ", type:"number", format:"$0,0.00"},
    {name:"Proceeds", displayName:"Proceeds: ", type:"number", format:"$0,0.00"},
  ];

  console.log("MTerm: ", props);


  return (<div className="term-sheet">
    {mortgageTermsValueNames.map((valueNameProperties, index) => {
      return (
        <InputWithLabels key={index}
                         inputFieldName={valueNameProperties.name}
                         inputLabel={valueNameProperties.displayName}
                         value={props.terms[valueNameProperties.name]}
                         inputFieldType={valueNameProperties.type}
                         inputFieldNumberFormat={valueNameProperties.format}
                          readonly={true}/>
      )})}

    </div>

  );
};

MTerm.propTypes = {
  terms:PropTypes.array,
};

export class MortgageTerms extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       showAll:false,
     };

     this.handleShowAllClick = this.handleShowAllClick.bind(this);
  }

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
        <div className={"organism-mortgageterms Avenir-LT-Std-65-Medium"}>
          <h2 className="mortgage-term-header" >
            Mortgage Terms {!this.state.showAll && <Button className={"show-all"} onClick={this.handleShowAllClick} disabled={this.state.showAll}>Show All</Button>}
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