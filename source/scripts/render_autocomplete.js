import { getNames } from './resources/namesMockResource';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './components/autocomplete.js';

ReactDOM.render(
  <AutoComplete value='ess' max='20' />
  , document.getElementById('content')
);

document.getElementsByClassName('ac-search-box')[0].focus()
