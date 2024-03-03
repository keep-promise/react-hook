import { useEffect, memo, useState, useCallback } from 'react';

/* 用react.memo */
const DemoChildren = memo((props)=>{
  /* 只有初始化的时候打印了 子组件更新 */
  console.log('子组件更新')
  useEffect(()=>{
    props.getInfo('子组件')
  },[])
  return <div>子组件</div>
})

const App = ({ id }) =>{
  const [number, setNumber] = useState(1);
  
  // 只有当id变化，才会生成新的函数getInfo
  const getInfo = useCallback((sonName)=>{
    console.log(sonName);
  },[id]);

  // 每一次重新render，会生成新的函数getInfo1
  const getInfo1 = (sonName)=>{
    console.log(sonName);
  };

  return <div>
    {/* 点击按钮触发父组件更新，但是子组件没有更新 */}
    <div>{number}</div>
    <button onClick={ () => setNumber(number+1) } >增加</button>
    <DemoChildren getInfo={getInfo} />
  </div>
}

export default App;
