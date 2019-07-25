import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || "",
      touched: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  /**
   * handleOnChange() is called every this a change is made to the value of the component.  The value od the component is stored in it's state which is used to update the rendering of the component
   * If the parent component provided a callback function via the onChange property, toe callback function is called with the change
   * @param event  The change event
   */
  handleOnChange(event) {
    // update the control
    this.setState({
      value: event.target.value
    });

    // and send the evaluation result to the parent, if they want to receive it
    this.props.onChange && this.props.onChange(event);
  }

  /**
   *  handleOnBlur() is called every time the input field loses the input focus.  The function will call a callback function if it was provided by the parent component via the onBlur property.
   */
  handleOnBlur() {
    this.props.onBlur && this.props.onBlur({touched: true});
  }

  handleOnFocus(event) {
    this.props.onFocus && this.props.onFocus(event);
  }

  render() {
    return (
      <input
        id={this.props.id}
        type={this.props.type || 'text'}
        name={this.props.name}
        value={this.state.value}
        className={classNames('atom-textInput', this.props.className, {"readonly": this.props.readonly})}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
        required={this.props.required && 'required'}
        placeholder={this.props.placeholder}
        readOnly={this.props.readonly || false}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'number']),
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readonly:PropTypes.bool
};
