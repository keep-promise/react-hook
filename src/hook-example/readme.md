 

# Hooks

**Hook只能在函数组件中调用**


## useState

```js
import Reac , {useState} from 'react'

const App = (params) => {
	const [count,setCount] = useState(0);

	const handleClick = () => {
		setCount(1)
		console.log(count) // 打印: 0 ，说明setCount是异步代码

		// 也可以给setCount赋值一个函数
		setCount((count) => {
			console.log(count) // 打印旧的count
			count++;
			console.log(count) // 打印新的count
			return count // 返回最新值覆盖count
		})
		
		setCount(count) // 赋的值和原来相同的话，并不会触发组件的重新渲染
	}
	
	console.log(count) // 打印：1 ，这个位置打印可以即时获取count的最新值	

	return (
		<div>
			<div>{count}</div>	
			<button onClick={handleClick}>按钮</button>
		</div>
	)
}

```

## useEffect 
## UseLayoutEffect 
## useInsertionEffect


useLayoutEffect的方法签名和useEffect一样，功能也类似。不同点在于，useLayoutEffect的执行时机要早于useEffect，它会在DOM改变后调用。在老版本的React中它和useEffect的区别比较好演示，React18中，useEffect的运行方式有所变化，所以二者区别不好演示。

useLayoutEffect使用场景不多，实际开发中，在effect中需要修改元素样式，且使用useEffect会出现闪烁现象时可以使用useLayoutEffect进行替换。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/6d5874fdb68e4d4c99a96e2c400e1c8c.png#pic_center)  
例：

```js
const App = () => {
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const h3Ref = useRef();
    const divRef = useRef();

    useEffect(()=>{
        //console.log('useEffect', h3Ref);
        if(!divRef.current) return;

        // 修改样式
        divRef.current.style.marginTop = "200px";
    }, [show]);

    // useLayoutEffect(()=>{
    //     console.log('useLayoutEffect', h3Ref);
    // });

    // useInsertionEffect(()=>{
    //     console.log('useInsertionEffect', h3Ref);
    // });

    return (
        <div>
            <h1>App</h1>
            <h3>{count}</h3>
            <button onClick={()=>setCount(prevState => prevState + 1)}>点我</button>
            <hr/>
            <button onClick={()=>setShow(prevState => !prevState)}>显示/隐藏</button>
            {
                show && <div ref={divRef} style={{width:100, height:100, backgroundColor:"red"}}/>
            }
        </div>

    );
};

```

React18以下时，我们发现页面的红色块在useEffect中，从出现到下移200像素之间会有明显的闪屏，但是换成useLayoutEffect时，却没有这个问题。

useInsertionEffect通常用于插入元素  
useLayoutEffect通常用于布局  
useEffect万能（推荐）

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useContext
=========================================================================

作用：向所有的后代传参

```js
import React, {Component , creatContext} from 'react'

const AppContext = creatContext();

// 类组件，第一种方式，通过函数消费祖先传过来的value
class Foo extends Component {
	render(){
		return (
		<AppContent.Consumer>
			{value => <div>{values}</div>}
		<AppContent.Consumer>
		)
	}
}

// 类组件，第二种消费祖先传过来的值的方式
class Bar extends Component {
	static contextType = AppContext
	render(){
		const value  = this.context
		return (
			<div>{value}</div>
		)
	}
}

// 以上的两种方式只能用于类组件，函数组件用useContext来消费祖先传过来的值
// 函数组件
const Baz = () => {

	const value = useContext(AppContext)
	
	return (
		<div>{value}</div>
	)
}

const Middle = () => {
	return (
		<div>
			<Foo />
			<Bar />
			<Baz />
		</div>
	)
}

const App = (params) => {
	return (
	<AppContext.Provider value='fanghui'>
		<Middle />	
	<AppContext.Provider>
	)
}

```

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useReducer
=========================================================================

作用：处理一些复杂的更加复杂的state运算

```
import Reac , { useReducer } from 'react'

const App = (params) => {

	const countReducer = (action,state) => {
		switch(action.type){
			case 'add':
				return state + 1
			case 'sub':
				return state - 1
			default:
			   return state
		}
	}
	
	const [count,dispatchCount] = useReducer(0)

	const add = () => {
		dispatchCount({type:'add'})
	}

	const sub = () => {
		dispatchCount({type:'sub'})
	}
	
	return (
		<div>
			<div>{count}</div>	
			<button onClick={add}>加1</button>
			<button onClick={sub}>减1</button>
		</div>
	)
} 

```

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useMemo 和 useCallback
====================================================================================

一种性能优化的手段

```
import React, { useState, useMemo, useCallback, memo } from "react"

// memo 的作用可以对前后传来的props进行浅比较，如果没有改变则不会重新渲染，如果改变则重新渲染
const Foo = memo(props => {
  console.log("Foo render");
  return (
    <div>
      <ul>{props.render()}</ul>
      {props.count}
    </div>
  )
})

const App = () => {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  // 返回值render是一个函数，它的引用只会在依赖项发生改变的时候，才会改变
  const render = useCallback(
    params => {
      let list = [];
      for (var i = 0; i < range.max; i++) {
        list.push(<li key={i}>{i}</li>);
      }
      return list;
    },
    [range]
  );

  // 返回值是函数执行后的结果，函数的执行只会在依赖项发生改变的时候，才会再次执行
  // const render = useMemo(
  //   params => {
  //     let list = [];
  //     for (var i = 0; i < range.max; i++) {
  //       list.push(<li key={i}>{i}</li>);
  //     }
  //     return list;
  //   },
  //   [range]
  // );

  //useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setRange({
            ...range,
            max: range.max + 1
          });
        }}
      >
        add
      </button>
      <Foo render={render}></Foo>
    </div>
  );
}

```

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useRef
=====================================================================

提到useRef，我们不得不再提下creatRef

1.  都可以获取原生DOM

```
import Reac , { creatRef, useRef } from 'react'

const FuncComp = (params) => {

	// 可以用creatRef创建ref容器，creatRef同样适用于类组件
	const inputRef = creatRef()
	// 也可以用useRef创建ref容器，useRef只能用在函数组件
	const inputRef = useRef()

    focusInput = () => {
		inputRef.current.foucs()
	}

	// 当我们每次更新state时，组件会重新渲染，我们发现通过creatRef创建的ref每次的引用都是不同的
	// 而useRef创建出来的ref的引用都是相同的，我们可以利用这个特性来存一些旧的数据 比如，inputRef.current.value = state.value ,这样即使当state的值被改变时，它存的还是旧值
	// 建议在类组件里使用creatRef，函数组件里使用useRef，这样可以提高性能
	
	return (
		<div>
			<input ref={inputRef} />	
			<button onClick={focusInput}>聚焦</button>
		</div>
	)
} 

```

2.  useRef和creatRef的区别

当子组件是类组件时

```
import Reac , { creatRef, useRef,Component } from 'react'

class ChildClassComp extends Component {
	
	const inputRef = creatRef()
	
	focusInput = () => {
		inputRef.current.foucs()
	}
	 
	render(){
		return (
				<div>
					<input ref={inputRef} />	
					<button onClick={focusInput}>聚焦</button>
				</div>
			)
	}
}

class ClassComp extends Component {

	// 当我们用creatRef绑定在类组件身上时，可以获取到类组件的实例
	const childRef = creatRef()

	conponentDidMount(){
		//调用类组件身上的方法
		childRef.current.focusInput()
	}
	
	render(){
		return (
				<div>
					<ChildClassComp  ref={childRef}/>	
				</div>
			)
	}
	
} 

```

当子组件是函数组件时

```
import Reac , { creatRef, useRef,Component，forwordRef } from 'react'

const ChildFuncComp = forwordRef ((props,ref) => {
	
	return (
			<div>
				<input ref={ref} />	
				<button onClick={focusInput}>聚焦</button>
			</div>
		)
})

class ClassComp extends Component {

	const childRef = creatRef()

	conponentDidMount(){
		//转发 refs 到子组件 DOM 组件
		childRef.current.focus()

		// ref绑定的子组件是函数组件时，无法像绑定类组件一样直接获取类组件的实例
		// 而且函数组件时不允许绑定ref的，否则控制台会报错，我们需要用forwordRef包裹一下
		// 然后转发ref绑定函数子组件的DOM元素
	}
	
	render(){
		return (
				<div>
					<ChildClassComp  ref={childRef}/>	
				</div>
			)
	}
	
} 

```

刚学的时候，还是蛮绕的，通过Js++集团的小夏老师的讲解终于弄懂了，感谢 !

总结 ：

1.  creatRef创建ref容器，既可以绑定类组件也可以绑定函数组件，但是当函数组件每次重新渲染时，它所创建的ref的引用都是新的，所以我们在函数组件里更推荐使用useRef，它每次创建出来的ref的引用都是一样的，性能更高。而类组件里别无选择，只能使用creatRef，它也只会在类组件里执行一次，ref的引用都是一样的。
2.  不论是useRef还是creatRef创建出来的ref绑定在类组件身上的时候，获取的是绑定类组件本身的实例，而当绑定的是函数组件的时候，只能使用forwordRef来转发到函数子组件里的具体DOM元素（我记的别的文章也叫穿透ref）

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useImperativeHandle
==================================================================================

前提：学会这个useImperativeHandle前，你需要学会useRef这个hook

作用：在项目中，别人调用我们写的子组件时，需要知道我们这个子组件所暴露给父组件的实例值，useImperativeHandle 应当与 forwardRef 一起使用

```
import Reac , { creatRef, useRef,Component，forwordRef } from 'react'

const ChildFuncComp = forwordRef ((props,ref) => {

  const inputRef = useRef()

  useImperativeHandle(ref,() => {
	return {
		customerFocus: () => {
      		inputRef.current.focus();
    	},
    	sayHello: () => {
    		console.log('Hello World')
		}
	}
  })
	
	return (
			<div>
				<input ref={inputRef} />	
				<button onClick={focusInput}>聚焦</button>
			</div>
		)
})

class ClassComp extends Component {

	const childRef = creatRef()

	conponentDidMount(){
		childRef.current.customerFocus()
		childRef.current.sayHello()
	}
	
	render(){
		return (
				<div>
					<ChildClassComp  ref={childRef}/>	
					<button onClick={inputRef}>聚焦</button>
				</div>
			)
	}
	
} 

```

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useDeferredValue
===============================================================================

待写…

[](https://blog.csdn.net/qq_38053677/article/details/126796437)useTransition
============================================================================

问题：

假设StudentsList是一个比较耗时操作的组件，这时，你在input框输入改变filterWord的值时，你会发现，输入input时非常的卡顿，原因时filterWord被两个组件同时用到，而StudentsList组件的耗时，会影响到input组件在页面中的显示效果，现在，我们想让这两个组件互不影响页面的效果，我们就需要用到useTransition这个hook了

```
export default const Index = () => {
	
	const [filterWord,setFilterWord] = useState('');

	const changeHander = (e) => {
		setFilterWord(e.target.value)
	}

	return ( 
		<input onClick={changeHander} value={filterWord} />
		<StudentsList filterWord={filterWord} />  // 假设StudentsList是一个比较耗时操作的组件
	)
}

```

解决：

```
export default const Index = () => {
	
	// isPending 指示过渡任务何时活跃以显示一个等待状态：true表示正在等待，false表示执行完毕
	const [isPending, startTransition] = useTransition();
	
	const [filterWord,setFilterWord] = useState('');
	const [filterWord2,setFilterWord2] = useState('');

	const changeHander = (e) => {
		setFilterWord(e.target.value)
		
		// startTransition 的回调函数中设置的setState会在其他setState生效后才执行
		startTransition(() => {
			setFilterWord2(e.target.value)
		})
	}

	return ( 
		<input onClick={changeHander} value={filterWord} />
		{!isPending && <StudentsList filterWord={filterWord2} />}  // 假设StudentsList是一个比较耗时操作的组件
	)
}

```