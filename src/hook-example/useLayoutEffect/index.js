import { useRef, useLayoutEffect } from 'react';
let x = 10;

let y = 20;

function getPositon() {
  return {
    x: x+10,
    y: y+10
  }
}

const App = () => {
  const target = useRef()
  useLayoutEffect(() => {
    /*我们需要在dom绘制之前，移动dom到制定位置*/
    const { x ,y } = getPositon() /* 获取要移动的 x,y坐标 */
    // animate(target.current, { x,y })
  }, []);
  return (
    <div >
      <span ref={ target } className="animate"></span>
    </div>
  )
}

export default App;