import { findDOMNode } from 'react-dom';
import { Component } from 'react';

class AutoselectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    input.select()
  }

  render() {
    return <input defaultValue="你好" />
  }
}

export default AutoselectingInput;