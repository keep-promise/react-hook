import { useRef, useState, useLayoutEffect, useEffect } from 'react';

const App = () => {
  const target = useRef();
  const [state, setState] = useState("hello world")

  // 先渲染屏幕后，再执行回调
  // useEffect(() => {
  //   let i = 0;
  //   while(i <= 100000000) {
  //     i++;
  //   };
  //   setState("world hello");
  //   console.log('useEffect ref', target)
  // }, []);

  // 渲染屏幕之前执行完成，useLayoutEffect中的回调函数没有执行完成，就不会渲染屏幕
  useLayoutEffect(() => {
    console.log('useLayoutEffect ref', target);
    let i = 0;
    while(i <= 1000000) {
      i++;
    };
    setState("world hello");
    
  }, []);


  return (
    <div >
      <span ref={ target } className="animate">{state}</span>
    </div>
  )
}

export default App;
