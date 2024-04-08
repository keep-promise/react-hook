import { useState, useEffect } from 'react'
import store from './store';


function ComA() {
  const [, forUpdate] = useState(0);
  const state = store.getState();
  
  const add = () => {
    store.dispatch({type: 'add'});
  }

  const sub = () => {
    store.dispatch({type: 'sub'});
  }

  useEffect(() => {
    store.subscribe(() => {
      console.log('store', store.getState())
      forUpdate(v=> v+1);
    })
  }, []);

  return (<div>
    ComA state: {state}
    <button onClick={add}>+</button>
    <button onClick={sub}>-</button>
  </div>)
}

function ComB() {
  const [, forUpdate] = useState(0);
  const state = store.getState();

  useEffect(() => {
    store.subscribe(() => {
      console.log('store', store.getState())
      forUpdate(v=> v+1);
    })
  }, []);

  return (<div>
    ComB state: {state}
  </div>)
}

function App() {
  return <div>
    <ComA></ComA>
    <ComB></ComB>
  </div>
}

export default App;