import React from 'react';
import {storiesOf} from '@storybook/react';

import {FormattedNumberInput} from './FormattedNumberInput.js';

const story = storiesOf('FormattedNumberInput', module);
story.add('Regular Currency Input Field', () => {
  return <FormattedNumberInput format="$0,0.00" name="test" />;
});

story.add('Regular Currency Input Field with value', () => {
  return <FormattedNumberInput name="test" format="$0,0.00" value="6"/>;
});

story.add('Percent Input Field with value', () => {
  return <FormattedNumberInput name="test" format="0.0%" value="0.1"/>;
});

story.add('Input Field for non-decimal numbers', () => {
  return <FormattedNumberInput name="test" format="0,0"/>;
});


