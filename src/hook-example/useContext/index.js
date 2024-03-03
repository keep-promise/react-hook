import React, { useState, createContext, useContext, Component } from 'react';

const AppContext = createContext(10000);
// createContext可以传入默认值，只有没有使用context中Provider，其他组件使用
// 默认值才生效

export default function App() {
  const [count, setCount] = useState(0);
  return (<>
    <p>{count}</p>
    <button onClick={() => setCount(count+1)}>add</button>
    <Child />
    <Child2 />
    <AppContext.Provider value={count}>
      <Child />
      <Child2 />
    </AppContext.Provider>
  </>)
}

function Child() {
  const count = useContext(AppContext);
  return (<>
    <div>Child1112</div>
    <h2>{count}</h2>
    <AppContext.Consumer>
      {/* // 接收Provider传过来的数据 */}
      {
        (data) => {
          return data
        }
      }
    </AppContext.Consumer>
  </>)
}

class Child2 extends Component {

  componentDidMount() {
    console.log('this.context', this.context)
  }

  render() {
    return (<div>
      <div>ChildClass</div>
      {/* <div>{this.context}</div> */}
    </div>);
  }
}
// class组件使用context
Child2.contextType = AppContext;

// useContext 
// 1.useContext可以帮助我们跨越组件层级直接传递变量，实现数据共享。
// 2.Context的作用就是对它所包含的组件树提供全局共享数据的一种技术。
// 3.Consumer组件内可以通过匿名函数的形式接收Provider传过来的数据, 
//   内部是一个函数, 这个函数接受一个对象作为参数, 参数是Provider里面提供的值
