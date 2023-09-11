// useState 可以使函数组件像类组件一样拥有 state，
// 函数组件通过 useState 可以让组件重新渲染，更新视图。

// 在函数组件一次执行上下文中，state 的值是固定不变的。
// setInterval(() => {
//   console.log('setInterval',number); 一直打印初始值
//   setNumber(number + 1);
// }, 1000);

// 如果两次 useState 传入相同的 state 值，那么组件就不会更新
// 在当前执行上下文中获取不到最新的 state, 只有再下一次组件 rerender 中才能获取到


import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0); // initData接收函数
  const [obj, setObj] = useState({name: 'aaa'});

  const btn3clk = ()=> {
    obj.name = 'bbb';
    setObj(obj); // 直接改变 `state`，在内存中指向的地址相同
  }

  const handleClick = () => {
		setCount(1)
		console.log('count1', count) // 打印: 0 ，说明setCount是异步代码

		// 也可以给setCount赋值一个函数
		setCount((count) => {
			console.log('count2', count) // 打印旧的count 1
			count++;
			console.log('count3', count) // 打印新的count 2
			return count // 返回最新值覆盖count
		})
		console.log('count4', count)
		setCount(count) // 赋的值和原来相同的话，并不会触发组件的重新渲染
	}

  console.log('app render', number, obj, count);

  return (<div>
    <div>{ number }</div>
    <button onClick={()=> {
      setNumber(number+1);
      console.log(number); /* 这里的number是不能够同步改变的  */
    }}>按钮1</button>
    <button onClick={() => {
      setInterval(() => {
        console.log('setInterval',number); // 执行上下文一直不变
        setNumber(number + 1);
      }, 1000);
    }}>按钮2</button>
    <div>{obj.name}</div>
    <button onClick={()=> {
      obj.name = 'bbb';
      setObj(obj); // 直接改变 `state`，在内存中指向的地址相同
    }}>按钮3</button>
    <button onClick={btn3clk}>按钮4</button>
    <div>count: {count}</div>
    <button onClick={handleClick}>click</button>
  </div>);
}

export default App;

// 点击按钮3 不会rerender，即不会打印app render
// 点击按钮1，执行rerender，视图中obj.name更新
// 再次点击按钮3，会rerender，因为obj更新了，后续再次点击按钮3/4都不会rerender

// 按钮4和按钮3表现一样
