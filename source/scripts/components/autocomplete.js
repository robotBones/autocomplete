import { getNames } from '../resources/namesMockResource';
import React, { Component } from 'react';
import _ from 'lodash';
import AutoCompleteInput from './autocomplete_input.js';
import AutoCompleteDropdown from './autocomplete_dropdown.js';
import ArrowKeysReact from 'arrow-keys-react';

function constrain(self, value) {
  if (value > self.state.suggestions.length - 1) {
    return self.state.suggestions.length - 1;
  } else if (value < -1) {
    return -1;
  } else {
    return value;
  }
}

export default class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: this.props.value || "",
      selected: -1
    };
    this.onInputChange  = this.onInputChange.bind(this);
    this.fillInput  = this.fillInput.bind(this);
    this.onKeyPress  = this.onKeyPress.bind(this);
    this.onHover  = this.onHover.bind(this);
    this.onSelect  = this.onSelect.bind(this);
    this.getSuggestions = _.debounce(this.getSuggestions.bind(this), 300);
    this.getSuggestions(this.state.text)

    ArrowKeysReact.config({
      up: () => {
        this.setState({ selected: constrain(this, this.state.selected - 1) });
      },
      down: () => {
        this.setState({ selected: constrain(this, this.state.selected + 1) });
      }
    });
  }

  getSuggestions(text) {
    getNames(text, names => {
      let suggestions = _.uniq(names).slice(0, this.props.max || 5);
      this.setState({ suggestions: suggestions });
    });
  }

  fillInput() {
    if (this.state.selected === -1) {
      return this.state.text;
    } else {
      return this.state.suggestions[this.state.selected];
    }
  }

  onInputChange(text) {
    this.setState({
      text: text,
      selected: -1
    });
    this.getSuggestions(text)
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      if (this.state.selected !== -1) {
        this.onSelect(this.state.selected);
      }
    }
  }

  onSelect() {
    this.setState({
      text: this.state.suggestions[this.state.selected],
      suggestions: [],
      selected: -1
    });

    document.getElementsByClassName('ac-search-box')[0].focus()
  }

  onHover(index) {
    this.setState({ selected: index });
  }

  render() {
    return (
      <div {...ArrowKeysReact.events} onKeyPress={this.onKeyPress} >
        <AutoCompleteInput
          value={this.fillInput()}
          onInputChange={this.onInputChange} />
        <AutoCompleteDropdown
          highlight={this.state.text}
          suggestions={this.state.suggestions}
          selected={this.state.selected}
          onHover={this.onHover}
          onSelect={this.onSelect} />
      </div>
    );
  }
}

