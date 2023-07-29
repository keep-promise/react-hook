## useSyncExternalStore
useSyncExternalStore 的诞生并非偶然，和 v18 的更新模式下外部数据的 tearing 有着十分紧密的关联。
useSyncExternalStore 能够让 React 组件在 concurrent 模式下安全地有效地读取外接数据源，
在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。
当读取到外部状态发生了变化，会触发一个强制更新，来保证结果的一致性。

```js
useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot
)
```

subscribe 为订阅函数，当数据改变的时候，会触发 subscribe，
在 useSyncExternalStore 会通过带有记忆性的 getSnapshot 
来判别数据是否发生变化，如果发生变化，那么会强制更新数据

getSnapshot 可以理解成一个带有记忆功能的选择器。当 store 变化的时候，
会通过 getSnapshot 生成新的状态值，这个状态值可提供给组件作为数据源使用，
getSnapshot 可以检查订阅的值是否改变，改变的话那么会触发更新。

getServerSnapshot 用于 hydration 模式下的 getSnapshot
