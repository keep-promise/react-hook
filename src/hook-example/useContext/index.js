import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export default function App() {
  const [count, setCount] = useState(0)
  return (<>
    <p>{count}</p>
    <button onClick={() => setCount(count+1)}>add</button>
    <AppContext.Provider value={count}>
      <Child />
    </AppContext.Provider>
  </>)
}

function Child() {
  const count = useContext(AppContext);
  return (
    <h2>{count}</h2>
  )
}

// useContext 
// 1.useContext可以帮助我们跨越组件层级直接传递变量，实现数据共享。
// 2.Context的作用就是对它所包含的组件树提供全局共享数据的一种技术。
