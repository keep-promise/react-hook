## useId

useId 也是 React v18 产生的新的 hooks , 它可以在 client 和 server 生成唯一的 id , 解决了在服务器渲染中，服务端和客户端产生 id 不一致的问题，更重要的是保障了 React v18 中 streaming renderer （流式渲染） 中 id 的稳定性。

低版本 React ssr 存在的问题：

比如在一些项目或者是开源库中用 Math.random() 作为 ID 的时候，可以会有一些随机生成 id 的场景：

```js
const rid = Math.random() + '_id_'  /* 生成一个随机id  */
function Demo (){
   // 使用 rid 
   return <div id={rid} ></div>
}
```

服务端渲染到 html 和 hydrate 过程分别在服务端和客户端进行，
但是会走两遍 id 的生成流程，这样就会造成 id 不一致的情况发生。
useId 的出现能有效的解决这个问题。

### v18 ssr

在 React v18 中 对 ssr 增加了流式渲染的特性 New Suspense SSR Architecture in React 18 ， 那么这个特性是什么呢？我们来看一下：

在传统 React ssr 中，如果正常情况下， hydrate 过程如下所示：

服务端渲染，只会渲染 html 结构，此时还没注入 js 逻辑，所以我们把它用灰色不能交互的模块表示。（如上灰色的模块不能做用户交互，比如点击事件之类的

hydrate.js 加载之后，此时的模块可以正常交互，所以用绿色的模块展示。

但是如果其中一个模块，服务端请求数据，数据量比较大，耗费时间长，我们不期望在服务端完全形成 html 之后在渲染，那么 React 18 给了一个新的可能性。可以使用包装页面的一部分，然后让这一部分的内容先挂起。

接下来会通过 script 加载 js 的方式 流式注入 html 代码的片段，来补充整个页面

在这个原理基础之上， React 这个特性叫 Selective Hydration，可以根据用户交互改变 hydrate 的顺序。

比如有两个模块都是通过 Suspense 挂起的，当两个模块发生交互逻辑时，会根据交互来选择性地改变 hydrate 的顺序。

如上 C D 选择性的 hydrate 就是 Selective Hydration 的结果。那么回到主角 useId 上，如果在 hydrate 过程中，C D 模块 id 是动态生成的，比如如下：

```js
let id = 0
function makeId(){
  return id++
}
function Demo(){
  const id = useRef( makeId() )
  return <div id={id}  >...</div>
}
```


那么如果组件是 Selective Hydration , 那么注册组件的顺序服务端和客户端有可能不统一，这样表现就会不一致了。那么用 useId 动态生成 id 就不会有这个问题产生了，所以说 useId 保障了 React v18 中 streaming renderer （流式渲染） 中 id 的稳定性。
