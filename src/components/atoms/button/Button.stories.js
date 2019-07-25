import React from 'react';
import {storiesOf} from '@storybook/react';

import {Button} from './Button.js';

const story = storiesOf('Button', module);
story.add('Regular Button', () => {
   return <Button>Regular Button</Button>;
});

story.add('Disabled Button', () => {
   return <Button disabled={true}>A Disabled Button</Button>;
});

story.add('Submit Button', () => {
   return <Button type="submit">Submit</Button>;
});

story.add('Reset Button', () => {
   return <Button type="reset">Reset</Button>;
});
