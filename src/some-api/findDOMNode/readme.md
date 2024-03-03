# findDOMNode 已废弃
此 API 将在未来的 React 主要版本中被移除
## 替代方案
ref

## 用法
findDOMNode 方法可以获取 类式组件 实例对应的浏览器 DOM 节点。
```js
const domNode = findDOMNode(componentInstance)
```
参考
findDOMNode(componentInstance)
用法
寻找类式组件对应的 DOM 节点
替代方案
使用 ref 读取组件自己的 DOM 节点
使用 ref 操作子组件的 DOM 节点
使用 <div> 包装


## 参数 
componentInstance：Component 子类的实例。举个例子，类式组件中的 this。

## 返回值 
findDOMNode 方法返回与给定的 componentInstance 中最接近的浏览器 DOM 节点。当组件渲染为 null 或 false 时，findDOMNode 返回 null。当组件渲染为字符串时，findDOMNode 返回一个包含该值的文本 DOM 节点。

## 注意 
组件可能会返回包含多个子元素的数组或 Fragment。在这种情况下，findDOMNode 会返回第一个非空子节点对应的 DOM 节点。

findDOMNode 只对已经挂载到 DOM 上的组件有效。如果你尝试在一个还未挂载的组件上调用 findDOMNode()（比如在一个还未创建的组件的 render() 方法中调用 findDOMNode()），会抛出异常。

findDOMNode 只会返回调用时的结果，你无法得知组件是否在之后渲染了不同的节点。

**findDOMNode 接受类组件实例作为参数，而不能用于函数式组件。**
