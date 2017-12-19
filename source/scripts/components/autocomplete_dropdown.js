import   React, { Component } from 'react';

function AutoCompleteDropdown(props) {
  let suggestions;
  if (props.highlight) {
    suggestions = props.suggestions.map((name, index) => {
      let termStart
        , termEnd
        , head
        , tail
        , term
        , match = name.match(new RegExp(props.highlight));
      if (match) {
        termStart = match.index
        termEnd = termStart + props.highlight.length;
        head = name.slice(0,termStart);
        tail = name.slice(termEnd);
        term = props.highlight;
      } else {
        return null;
      }

      let selectionState = 'unselected';
      if (props.selected === index) {
        selectionState = 'selected'
      }

      return (
        <li
          className={`ac-suggestion ${selectionState}`}
          key={name}
          onMouseOver={() => props.onHover(index)}
          onClick={props.onSelect} >
          {head}<b>{term}</b>{tail}
        </li>
      );
    });
  }

  suggestions = _.compact(suggestions);
  return <ul className='ac-suggestions' >{suggestions}</ul>;
}

export default AutoCompleteDropdown;
