import React from 'react';
import {storiesOf} from '@storybook/react';

import {GooglePlacesAutoComplete} from './GooglePlacesAutoComplete.js';

const story = storiesOf('Google Places Autocomplete', module);
story.add('Google Place', () => {
  const handleSelectPlace = (place) => {
    console.log("The following address was selected", place);
  };

  return (
    <div>
      <GooglePlacesAutoComplete onPlaceSelected={handleSelectPlace} className="story-board-class"/>
    </div>
  );
});
