import React, { useState, useDebugValue } from 'react';
import ReactDOM from 'react-dom';

// 自定义 Hook
function useMyCount(num) {
  const [ count, setCount ] = useState(0);

  // 延迟格式化
  useDebugValue(count > num ? '溢出' : '不足', status => {
    return status === '溢出' ? 1 : 0;
  });

  const myCount = () => {
    setCount(count + 2);
  }

  return [ count, myCount ];
}

function App() {
  const [ count, seCount ] = useMyCount(10);

  return (
    <div>
      {count}
      <button onClick={() => seCount()}>setCount</button>
    </div>
  )
}

export default App;