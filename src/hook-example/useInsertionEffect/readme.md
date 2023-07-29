## useInsertionEffect ---CSS-in-JS

useInsertionEffect 是在 React v18 新添加的 hooks ，它的用法和 useEffect 和 useLayoutEffect 一样。那么这个 hooks 用于什么呢?

在介绍 useInsertionEffect 用途之前，先看一下 useInsertionEffect 的执行时机。

```js
React.useEffect(()=>{
    console.log('useEffect 执行')
},[])
 
React.useLayoutEffect(()=>{
    console.log('useLayoutEffect 执行')
},[])
 
React.useInsertionEffect(()=>{
    console.log('useInsertionEffect 执行')
},[])
```

useInsertionEffect 执行 -> useLayoutEffect 执行 -> useEffect 执行



可以看到 useInsertionEffect 的执行时机要比 useLayoutEffect 提前，useLayoutEffect 执行的时候 DOM 已经更新了，但是在 useInsertionEffect 的执行的时候，DOM 还没有更新。**本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题**。这个 hooks 主要是应用于这个场景，在其他场景下 React 不期望用这个 hooks 。