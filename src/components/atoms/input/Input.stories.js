import React from 'react';
import {storiesOf} from '@storybook/react';

import {Input} from './Input.js';

const story = storiesOf('Input', module);
story.add('Input without any properties', () => {
   return <Input name="TestInputField" placeholder="Test Input" />;
});

story.add('Readonly Input', () => {
   return <Input name="TestInputField" placeholder="Test Input" readonly={true}/>;
});
