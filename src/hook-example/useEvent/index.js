import { useState, useEvent, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(false);

  const consoleShowCB = useCallback(() => {
    console.log('consoleShowCB', count);
  }, [])

  const consoleShow = useEvent(() => {
    console.log('consoleShow', count);
  }, [])


  return (<div>
    <button onClick={() => setCount(count+1)}>add</button>
    <button onClick={() => consoleShowCB()}>useCallback</button>
    <button onClick={() => consoleShow()}>useCallback</button>

  </div>)
}

export default App;
