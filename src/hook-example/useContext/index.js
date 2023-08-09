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
  return (<>
    <h2>{count}</h2>
    <AppContext.Consumer>
      // 接收Provider传过来的数据
      (data) => {
        console.log(data)
      }
    </AppContext.Consumer>
  <>)
}

// useContext 
// 1.useContext可以帮助我们跨越组件层级直接传递变量，实现数据共享。
// 2.Context的作用就是对它所包含的组件树提供全局共享数据的一种技术。
// 3.Consumer组件内可以通过匿名函数的形式接收Provider传过来的数据, 内部是一个函数, 这个函数接受一个对象作为参数, 参数是Provider里面提供的值
