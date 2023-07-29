import { useCallback, useMemo } from 'react';

function App(){
  const style = useMemo(()=>{
    let computedStyle = {}
    // 经过大量的计算
    return computedStyle
  },[]);

  const styleCallback = useCallback(()=>{
    let computedStyle = {}
    // 经过大量的计算
    return computedStyle
  },[]);

  console.log('useMemo result', style); // {}
  console.log('useCallback result', styleCallback); // f

  return <div style={style}></div>
}

export default App;

// useMemo 得到派生出来的新状态 contextValue ，
// 只有 keeper 变化的时候，才改变 Provider 的 value 。

