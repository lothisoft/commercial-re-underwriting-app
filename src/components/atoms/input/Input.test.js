import React from 'react';
import ReactDOM from 'react-dom';

import {Input} from './Input';

const {expect, test} = global;

test('Render a Input ', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Input name="TestInput" />, div);
   expect(div.querySelector('input').name).toBe('TestInput');
   expect(div.querySelector('input').className).toBe('atom-Input');
   expect(div.querySelector('input').type).toBe('text');
   expect(div.querySelector('input').required).toBe(false);
});

test('Render a Email Input ', () => {
   const div = document.createElement('div');
   ReactDOM.render(
      <Input
         type="email"
         name="TestInput"
         className="my-class1 my-class2"
      />,
      div
   );
   expect(div.querySelector('input').name).toBe('TestInput');
   expect(div.querySelector('input').className).toContain('atom-Input');
   expect(div.querySelector('input').className).toContain('my-class1');
   expect(div.querySelector('input').className).toContain('my-class2');
   expect(div.querySelector('input').type).toBe('email');
   expect(div.querySelector('input').required).toBe(false);
});

test('Render a Input which is required', () => {
   const div = document.createElement('div');
   ReactDOM.render(
      <Input type="text" name="TestInput" required={true} />,
      div
   );
   expect(div.querySelector('input').name).toBe('TestInput');
   expect(div.querySelector('input').className).toBe('atom-Input');
   expect(div.querySelector('input').type).toBe('text');
   expect(div.querySelector('input').required).toBe(true);
});
