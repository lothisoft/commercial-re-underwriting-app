import React from 'react';
import ReactDOM from 'react-dom';

import {Label} from './Label';

const {expect, test} = global;

test('Render a Label component without htmlFor and without classNames', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Label>A</Label>, div);
   expect(div.querySelector('label').textContent).toBe('A');
   expect(div.querySelector('label').className).toBe('atom-label');
   expect(div.querySelector('label').htmlFor).toBe('');
});

test('Render a Label component with classNames', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Label className="myClass1 myClass2">B</Label>, div);

   expect(div.querySelector('label').textContent).toBe('B');
   expect(div.querySelector('label').className).toContain('atom-label');
   expect(div.querySelector('label').className).toContain('myClass1');
   expect(div.querySelector('label').className).toContain('myClass2');
   expect(div.querySelector('label').htmlFor).toBe('');
});

test('Render a Label component with htmlFor reference', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Label htmlFor="input-field-email">C</Label>, div);

   expect(div.querySelector('label').textContent).toBe('C');
   expect(div.querySelector('label').className).toContain('atom-label');
   expect(div.querySelector('label').htmlFor).toBe('input-field-email');
});
