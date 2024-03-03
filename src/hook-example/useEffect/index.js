// 测试useEffect

import React, { useEffect, useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  const temp = 1;
  const temObj = {a: 1};
  const click = () => {
    setCount((count) => count+1);
  }

  // useEffect(() => {
  //   console.log('依赖项为对象类型'); // 每次render都会重新执行
  // }, [temObj]) // 每一次render，tempObj都是新的，所以每一次都会执行

  useEffect(() => {
    console.log('依赖项为基本类型');
    // setCount((count) => count+1); //
  }, [temp]) // 只会执行第一次 

  useEffect(() => {
    console.log('依赖项为空useEffect');
    // setCount((count) => count+1); //
  }, []) // 只会执行第一次 componentDidMount

  useEffect(() => {
    console.log('无依赖useEffect');
    // setCount((count) => count+1); // 会无限执行
  }) // 无依赖项，每次render都会查询执行 等价--shouldComponentUpdate

  return (<div>
    <div>{count}</div>
    <button onClick={click}>add</button>
  </div>)
}

export default App;


// 模拟生命周期
// 模拟componentDidMount  -  useEffect(()=>{},[])
// 模拟compenentDidUpdate - useEffect(()=>{},[xxx]) 无依赖 ，或者 依赖 [a,b,c]
// 模拟componentWillUnMount - useEffect 中返回一个函数

// hooks解决了什么问题
// 1、在组件之间复用状态逻辑很难
// 2、复杂组件变得难以理解
// 3、class学习成本高（this)
