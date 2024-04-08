import { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';

function A(props) {
  console.log('A', props);
  
  const add = () => {
    props.dispatch({type: 'add'});
  }

  const sub = () => {
    props.dispatch({type: 'sub'});
  }

  return (<div>
    ComA state: {props.state}
    <button onClick={add}>+</button>
    <button onClick={sub}>-</button>
  </div>)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return { state };
}

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps', dispatch);
  return { dispatch };
}

const ComA = connect(mapStateToProps, mapDispatchToProps)(A)

function B(props) {
  console.log('B', props);
  return (<div>
    ComB state: {props.state}
  </div>)
}

const ComB = connect(mapStateToProps, mapDispatchToProps)(B)


function App() {
  return <Provider store={store}>
    <ComA></ComA>
    <ComB></ComB>
  </Provider>
}

export default App;