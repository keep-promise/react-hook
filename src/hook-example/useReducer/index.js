import React, { useReducer } from 'react';

export default function ReducerDemo() {
  const [count, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'add':
        return state + 1;
      case 'sub':
        return state - 1;
      default:
        return state;
    }
  }, 0); // useReducer入参：reducer、初始值0，

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => dispatch({type: 'add'})}>add</button>
      <button onClick={() => dispatch({type: 'sub'})}>sub</button>
    </div>
  )
}

