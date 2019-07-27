import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Input} from '../../atoms/input/Input.js';
import {FormattedNumberInput} from '../../atoms/formattedNumberInput/FormattedNumberInput.js';
import {Label} from '../../atoms/label/Label.js';

import "./InputWithLabels.scss";

export class InputWithLabels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || "",
      touched:false,
      valid:!this.props.validation,  // if there is no validation function, assume the value is valid
      validationMessage:""
    };

    this.handleOnChange =  this.handleOnChange.bind(this);
    this.handleOnBlur =  this.handleOnBlur.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange &&  this.props.onChange(event);

    // validate
    const validationResult = this.props.validation && this.props.validation(event.target.value);
    const isValueValid = validationResult === false || typeof(validationResult) === "string" ? false: true;
    const validationMessage = typeof(validationResult) === "string" ? validationResult : "";

    this.setState({
      valid:isValueValid,
      validationMessage
    });

  };

  handleOnBlur(event) {
    let value;
    if (this.props.inputFieldType === 'number') {
      value =  Number(event.target.value);
    } else {
      value = event.target.value;
    }
    this.props.onBlur &&  this.props.onBlur({touched:true, value});

    this.setState({
      touched:true
    });
  };

  render () {
    console.log("InputWithLabels.render()", this.state);
    const inputError =
      ((typeof(this.state.valid) === 'boolean' && !this.state.valid) ||
      (typeof(this.state.valid) === 'string' && this.state.valid) ||
        false)  && (this.props.wasTouched || this.state.touched);

    return (
      <div className={classNames("input-with-labels", this.props.className)}>
        {this.props.inputLabel &&
        <Label className={classNames("input-label", {'input-label-error': inputError})} htmlFor={this.props.inputFieldName}>{this.props.inputLabel}</Label>}
        <div className="input-field-container">

          {this.props.inputFieldType === 'text' &&
          <Input name={this.props.inputFieldName}
                 value={this.state.value}
                 className={classNames("the-input-field-text",
                   {'text-input-error': inputError}, {'read-only':this.props.readonly},
                 )}
                 onChange={this.handleOnChange}
                 onBlur={this.handleOnBlur}
                 readonly={this.props.readonly}/>
          }
          {this.props.inputFieldType === 'number' &&
          <FormattedNumberInput name={this.props.inputFieldName}
                                className={classNames("the-input-field-number",
                                  this.props.className,
                                  {'number-input-error': inputError,
                                  'read-only':this.props.readonly})}
                                format={this.props.inputFieldNumberFormat}
                                value={this.state.value}
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                readonly={this.props.readonly}/>}
          {inputError &&
          <Label
            className="error-label">{inputError && this.state.validationMessage}
          </Label> }
        </div>
      </div>
    );
  }
}

InputWithLabels.propTypes = {
  inputLabel:PropTypes.string,                       // the content of the input label
  inputFieldName:PropTypes.string.isRequired,        //the field name of the input field
  inputFieldType:PropTypes.oneOf(['text', 'number']).isRequired,  // the type of input field
  inputFieldNumberFormat:PropTypes.string,                        // the number format for number input fields only
  className:PropTypes.string,
  value:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),                     // the original value of the input field
  validation: PropTypes.func,                                      // the validation function
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  wasTouched: PropTypes.bool,
  readonly:PropTypes.bool
};

