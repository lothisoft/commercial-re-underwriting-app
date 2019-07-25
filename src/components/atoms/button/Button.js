import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = (props) => {
   const {type, children, className, disabled, ...rest} = props;
   return (
      <button
         type={type || 'button'}
         className={classNames('atom-button', className, {disabled: disabled})}
         disabled={disabled && 'disabled'}
         {...rest}>
         {children}
      </button>
   );
};

Button.propTypes = {
   type: PropTypes.oneOf(['submit', 'reset', 'button']),
   name: PropTypes.string,
   value: PropTypes.string,
   className: PropTypes.string,
   disabled: PropTypes.bool,
   children: PropTypes.node
};
