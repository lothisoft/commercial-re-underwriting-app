import React from "react";
import PropTypes from "prop-types";

import numeral from 'numeral';
import classNames from "classnames";


export class FormattedNumberInput extends React.Component {
  constructor(props) {
    super(props);

    // if a value was passed, format is and add it to the state
    let value = this.props.value;
    if (value) {
      value = numeral(value).format(this.props.format);
    }

    let defaultValue = "";
    if (props.readonly) {
      defaultValue = 0;
    }

    this.state = { isEditing: false, value:(value || defaultValue)};

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur =  this.handleOnBlur.bind(this);
    this.handleOnFocus =  this.handleOnFocus.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  /**
   * handleOnChange() is called every time the content of an input field changes.  The function stores the content
   * of the input field in its state.  It calls the event handler of the parent, if provided
   * @param event
   */
  handleOnChange(event) {
    this.props.onChange && this.props.onChange(event);
    this.setState({value:event.target.value});
  }

  /**
   * handleOnBlur() is called when the input field loses the cursor focus.  It calls a function to toggles its edit status
   * to viewing. It calls the event handler of the parent, if provided.
   * @param event
   */
  handleOnBlur(event) {
    this.props.onBlur && this.props.onBlur(event);
    this.toggleEditing();
  }

  /**                                   .
   * handleOnFocus() is called when the input field gains the cursor focus.  It calls a function to toggle its edit status
   * to editing.  It calls the event handler of the parent, if provided
   * @param event
   */
  handleOnFocus(event) {
    this.props.onFocus &&  this.props.onFocus(event);
    this.toggleEditing();
  }

  /**
   * toggleEditing() changes the edit/view status of the component.  In particular, it changes the value according to the
   * format provided in order to display the number accurately in view mode.  The parent is informed of value changes.
   */
  toggleEditing() {
    if (this.props.readonly) {
      return;
    }

    numeral.zeroFormat('');
    const numberFormatter = numeral(this.state.value);
    let newValue;
    if (this.state.isEditing) {
      newValue = numberFormatter.format(this.props.format);
    } else {
      newValue =numberFormatter.value();
    }
    if (newValue === null) {
      newValue="";
    }
    this.setState({ isEditing: !this.state.isEditing ,
                          value: newValue }
                          );
    // notify the parent about the change if they are listening
    this.props.onChange && this.props.onChange({target:{value:newValue}});
  }

  render() {
    return (
        this.state.isEditing ? (
          <input
            type="number"
            name={this.props.name}
            value={this.state.value}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            readOnly={this.props.readonly}
            className={classNames('atom-formatNumberInput editing', this.props.className, {'read-only':this.props.readonly})}
          />
        ) : (
          <input
            type="text"
            name={this.props.name}
            value={this.state.value}
            onFocus={this.handleOnFocus}
            readOnly={true}
            className={classNames('atom-formatNumberInput viewing', this.props.className, {'read-only':this.props.readonly})}
          />
        )
    );
  }
}

FormattedNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  format: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  readonly:PropTypes.bool,
};



