import { useSyncExternalStore } from 'react';
import { combineReducers , createStore  } from 'redux';
 
/* number Reducer */
function numberReducer(state=1,action){
    switch (action.type){
      case 'ADD':
        return state + 1
      case 'SUB':
        return state - 1
      default:
        return state
    }
}
 
/* 注册reducer */
const rootReducer = combineReducers({ number: numberReducer  })
/* 创建 store */
const store = createStore(rootReducer,{ number:1  });
 
function App(){
  /* 订阅外部数据源 */
  const state = useSyncExternalStore(store.subscribe, () => {
    console.log('getSnapshot', store.getState().number);
    return store.getState().number;
  });
  console.log(state)
  return <div>
      {state}
      <button onClick={() => store.dispatch({ type:'ADD' })} >ADD</button>
      <button onClick={() => store.dispatch({ type:'SUB' })} >SUBS</button>
  </div>
}

export default App;

// 点击按钮，会触发 reducer ，然后会触发 store.subscribe 订阅函数，
// 执行 getSnapshot 得到新的 number ，判断 number 是否发生变化，如果变化，触发更新。