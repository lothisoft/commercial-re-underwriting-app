import React from 'react';
import ReactDOM from 'react-dom';

import {Button} from './Button';

const {expect, test} = global;

test("Render a button which isn't disabled", () => {
   const div = document.createElement('div');
   ReactDOM.render(
      <Button name="TestButton" value="TestValue" type="button">
         My Button
      </Button>,
      div
   );
   expect(div.querySelector('button').name).toBe('TestButton');
   expect(div.querySelector('button').value).toBe('TestValue');
   expect(div.querySelector('button').className).toBe('atom-button');
   expect(div.querySelector('button').type).toBe('button');
   expect(div.querySelector('button').disabled).toBe(false);
   expect(div.querySelector('button').textContent).toBe('My Button');
});

test('Render a disabled button', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Button disabled={true}>My Button</Button>, div);
   expect(div.querySelector('button').type).toBe('button');
   expect(div.querySelector('button').disabled).toBe(true);
   expect(div.querySelector('button').className).toContain('disabled');
});

test('Render a button with extra class names', () => {
   const div = document.createElement('div');
   ReactDOM.render(
      <Button type="submit" className="myClass1 myClass2">
         My Button
      </Button>,
      div
   );
   expect(div.querySelector('button').type).toBe('submit');
   expect(div.querySelector('button').className).toContain('atom-button');
   expect(div.querySelector('button').className).toContain('myClass1');
   expect(div.querySelector('button').className).toContain('myClass2');
});

test('Render a reset button', () => {
   const div = document.createElement('div');
   ReactDOM.render(
      <Button name="TestButton" type="reset" className="myClass1 myClass2">
         My Button
      </Button>,
      div
   );
   expect(div.querySelector('button').type).toBe('reset');
});
