import React, { Component } from 'react';

function updateInput(event, props) {
  let text = event.target.value;
  props.onInputChange(text);
}

function AutoCompleteInput(props) {
  return (
    <input
      className='ac-search-box'
      type='text'
      tabIndex='-1'
      autoFocus
      onChange={(e) => updateInput(e, props)}
      value={props.value} />
  );
}

export default AutoCompleteInput;
