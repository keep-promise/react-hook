import React, { ErrorBoundary } from 'react';
import { RecoilRoot, atom, selector, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

// Atom 是一种新的状态，但是和传统的 state 不同，
// 它可以被任何组件订阅，当一个 Atom 被更新时，
// 每个被订阅的组件都会用新的值来重新渲染。

// 创建一个 Atom ，必须要提供一个 key ，其必须在 RecoilRoot 作用域中是唯一的，
// 并且要提供一个默认值，默认值可以是一个静态值、函数甚至可以是一个异步函数
export const nameState = atom({
  key: 'nameState',
  default: 'hello_recoil'
});



function App() {
  // 使用 recoil 状态的组件需要使用 RecoilRoot 包裹起来：
  return <RecoilRoot>
    <UseRecoilStateInput />
    <UseRecoilValue />
    <UseSetRecoilState />
    <NameLength />
    {/* <ErrorBoundary>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </ErrorBoundary> */}
    {/* <CurrentUserInfo /> */}
  </RecoilRoot>
}

// 订阅和更新状态
// Recoil 采用 Hooks 方式订阅和更新状态，常用的是下面三个 API：

// useRecoilState：类似 useState 的一个 Hook，可以取到 atom 的值以及 setter 函
// useSetRecoilState：只获取 setter 函数，如果只使用了这个函数，状态变化不会导致组件重新渲染
// useRecoilValue：只获取状态

// useRecoilState
const UseRecoilStateInput = () => {
  const [name, setName] = useRecoilState(nameState)
  const onChange = (event) => {
    setName(event.target.value);
  };
  return <>
   <input type="text" value={name} onChange={onChange} />
   <div>Name: {name}</div>
  </>;
}

// useRecoilValue
const UseRecoilValue = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
}

// useSetRecoilState 调用setName本组件，不会重新刷新
const UseSetRecoilState = () => {
  const setName = useSetRecoilState(nameState);
  console.log('UseSetRecoilState')
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}

const lengthState = selector({
  key: 'lengthState', 
  get: ({get}) => {
    const text = get(nameState);
    return text.length;
  },
});

// 派生状态
// selector 表示一段派生状态，它使我们能够建立依赖于其他 atom 的状态。
// 它有一个强制性的 get 函数，其作用与 redux 的 reselect 或 MobX 的 @computed 类似

function NameLength() {
  const length = useRecoilValue(lengthState);
  return <>Name Length: {length}</>;
}

// 异步状态
// Recoil 提供了通过数据流图将状态和派生状态映射到 React 组件的方法。
// 真正强大的功能是图中的函数也可以是异步的。这使得我们可以在异步 React 
// 组件渲染函数中轻松使用异步函数。使用 Recoil，你可以在选择器的数据流
// 图中无缝地混合同步和异步功能。只需从选择器 get 回调中返回 Promise ，而不是返回值本身。
const userNameQuery = selector({
  key: 'userName',
  get: async () => {
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve({name: 'hello'})
      }, 1000);
    })
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(userNameQuery);
  return <div>{userName}</div>;
}

export default App;

// Recoil 推崇的是分散式的状态管理，这个模式很类似于 Mobx，
// 使用起来也感觉有点像 observable + computed 的模式，但是
// 其 API 以及核心思想设计的又没有 Mobx 一样简洁易懂，反而有点复杂，
// 对于新手上手起来会有一定成本。

// 在使用方式上完全拥抱了函数式的 Hooks 使用方式，并没有提供 Componnent 
// 的使用方式，目前使用原生的 Hooks API 我们也能实现状态管理，我们也可以使用 
// useMemo 创造出派生状态，Recoil 的 useRecoilState 以及 selector 也比较
// 像是对 useContext、useMemo 的封装。

// 但是毕竟是 Facebook 官方推出的状态管理框架，其主打的是高性能以及可以利用 
// React 内部的调度机制，包括其承诺即将会支持的并发模式，这一点还是非常值得期待的。

// 另外，其本身的分散管理原子状态的模式、读写分离、按需渲染、派生缓存等思想还是非常值得一学的。