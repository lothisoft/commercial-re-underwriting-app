import React from 'react';
import {storiesOf} from '@storybook/react';

import {Label} from './Label.js';

const story = storiesOf('Label', module);
story.add('Label without any properties', () => {
   return <Label>Example of Label without properties</Label>;
});

story.add('Label with a className property', () => {
   return (
      <Label className="myClass">
         Example of Label with a className property
      </Label>
   );
});

story.add('Label with a htmlFor property', () => {
   return (
      <Label htmlFor="input-field">
         Example of Label with a htmlFor property (the actual HTML label tag is
         rendered with a &amp;for&amp; attribute)
      </Label>
   );
});
