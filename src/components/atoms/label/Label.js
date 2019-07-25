import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './Label.css';

export const Label = (props) => {
   const {className, children, ...rest} = props;
   return (
      <label className={classNames('atom-label', className)} {...rest}>
         {children}
      </label>
   );
};

Label.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   htmlFor: PropTypes.string
};
