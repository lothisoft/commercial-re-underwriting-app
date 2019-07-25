import React from 'react';
import {storiesOf} from '@storybook/react';

import numeral from 'numeral';
import {InputWithLabels} from './InputWithLabels.js';

const story = storiesOf('InputWithLabels', module);
story.add('InputWithsLabels for Text', () => {
  return (
    <InputWithLabels inputLabel="Text Input" inputFieldName="Test" inputFieldType="text"  className="Test-Input-For-Text"/>
  );
});

const required = (value) => {
  if (!value) {
    return false;
  };
  return value.length > 0;
};

story.add('InputWithsLabels for required Text', () => {
  return (
    <InputWithLabels inputLabel="TextInput" inputFieldName="Test" inputFieldType="text" validation={required}/>
  );
});


const largerThanZero = (value) => {
  let _value;
  if (typeof value === "string") {
    const numberFormatter = numeral(value);
    _value = numberFormatter.value();
  } else {
    _value = value;
  }
  return _value >= 0 ? true : "The number needs to be larger than zero";
}

story.add('InputWithsLabels for Numbers lager than 0', () => {
  return (
    <InputWithLabels inputLabel="NumberInput" inputFieldName="Test" inputFieldType="number"  inputFieldNumberFormat="$0,0.00" validation={largerThanZero}/>
  );
});

story.add('InputWithsLabels readonly', () => {
  return (
    <InputWithLabels inputLabel="NumberInput" inputFieldName="Test" inputFieldType="number"  inputFieldNumberFormat="$0,0.00" value="1" readonly={true}/>
  );
});


story.add('InputWithsLabels readonly with value provided', () => {
  return (
    <InputWithLabels inputLabel="NumberInput" inputFieldName="Test" inputFieldType="text" value="Test" readonly={true}/>
  );
});
