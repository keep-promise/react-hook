## useRef
useRef 可以用来获取元素，缓存状态，接受一个状态 initState 作为初始值，
返回一个 ref 对象 cur, cur 上有一个 current 属性就是 ref 对象需要获取的内容。

useRef 获取 DOM 元素，在 React Native 中虽然没有 DOM 元素，
但是也能够获取组件的节点信息（ fiber 信息 ）。


useRef缓存的状态修改不会导致组件rerender，这是和useState的区别，也是它存在的原因

