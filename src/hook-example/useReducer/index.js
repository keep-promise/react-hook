import React, { useReducer } from 'react';

const reducer = (state, action) => {
  console.log('reducer', state, action);
  switch(action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}

export default function ReducerDemo() {
  const [count, dispatch] = useReducer(reducer, 0); // useReducer入参：reducer、初始值0，

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => dispatch({type: 'add'})}>add</button>
      <button onClick={() => dispatch({type: 'sub'})}>sub</button>
    </div>
  )
}

// 一个函数 reducer ，我们可以认为它就是一个 redux 中的 reducer , reducer的参数就是常规reducer里面的state和action, 返回改变后的state,
// 这里有一个需要注意的点就是：如果返回的 state 和之前的 state ，内存指向相同，那么组件将不会更新