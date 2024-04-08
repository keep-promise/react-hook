### 1\. MobX

MobX 的官网：

> MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程 (transparently applying functional reactive programming - TFRP) 使得状态管理变得简单和可扩展。MobX背后的哲学很简单:
> 
> _任何源自应用状态的东西都应该自动地获得，其中包括UI、数据序列化、服务器通讯，等等。_


MobX Flow

相比 Redux 的强规则约定，`MobX` 明显更简单灵活，MobX的核心原理是**通过 `action` 触发 `state` 的变化，进而触发 `state` 的衍生对象（Computed values & Reactions）**

开发者只需要定义需要 Observer 的数据和由此衍生的数据（Computed value）或者操作（Reactions），剩下的更新自然就交给 MobX 去做就可以了。

MobX 和 Redux 对比

| Redux | MobX |
| --- | --- |
| 函数式 | 面向对象 |
| state每次返回新的数据，理想状态是immutable | 始终保持一份引用 |
| 支持函数回溯 | 无法支持回溯 |
| 约定单一数据源 | 将state树拆分进多个store中 |
| 中间件处理异步 | async/await处理 |

总之，两者相比，MobX 确实比 Redux 上手更容易些，并且不需要写很多样板代码，但 Redux 的这种“复杂”不一定是无用的，强约定的规则可以为大型项目，复杂数据状态管理提供可靠的支持，而 MobX 在某些场景下确实可以比 Redux 项目提供更高效的选择。

### 2\. MobX 核心 API 解析

MobX 的 API 可分为四类：

定义状态（ `observable` ）、响应状态（ `autorun`, `computed` ）、修改状态（ `action` ）、辅助函数。

#### observable 和 autorun

实例

```js
import { observable, autorun } from 'mobx';

const value = observable(0);
const number = observable(100);

autorun(() => {
  console.log(value.get());
});

value.set(1);
value.set(2);
number.set(101);

```

`observable` 用于定义可观察状态，观测的数据可以是数字、字符串、数组、对象等。

注意：被 `observable` 观测数据的修改是**同步**的，不像 setState 那样是异步。

`autorun` 用于定义响应函数，并在定义时_立即执行一次_。 以后，每当依赖状态发生变化时，`autorun` 自动重新运行。

上面的 autorun 函数中，只对 value 值进行了操作，而并没有 number 值的什么事儿，所以 number.set(101) 这步并不会触发 autorun ，只有 value 的变化才触发了 autorun

#### 计算属性 computed

`computed` 与 `autorun` 相似，他们都会在依赖的状态发生变化时会重新运行，不同之处是 `computed` 接收的是 `纯函数` 并且返回一个计算值，这个计算值在状态变化时会自动更新，计算值可以在 autorun 中使用。

*   computed 值会被**缓存**

每当读取 computed 值时，如果其依赖的状态或其他 computed 值未发生变化，则使用上次的缓存结果，以减少计算开销。

*   computed 值会**惰性计算**

只有 computed 值被使用时才重新计算值。反之，即使 computed 值依赖的状态发生了变化，但是它暂时没有被使用，那么它不会重新计算。

实例

```js
const number = observable(10);
const plus = computed(() => number.get() > 0);

autorun(() => {
  console.log(plus.get());
});

number.set(-19);
number.set(-1);
number.set(1);

```

依次输出了 `true`，`false`，`true`

第一个 true 是 number 初始化值的时候，10>0 为 true 没有问题。

第二个 false 将 number 改变为-19，输出 false，也没有问题。

但是当-19改变为-1的时候，虽然 number 变了，但是 number 的改变实际上并没有改变 plus 的值，所以没有其它地方收到通知，因此也就并没有输出任何值。

直到 number 重新变为1时才输出 true。

#### action 和 runInAction

实际开发的时候建议开启严格模式，去掉 action 会报错。

```js
// 强制只能通过 action 修改状态
configure({
  enforceActions: "always"
});

```

action用于定义状态修改操作，其写法大概有如下几种：

> action(fn)
> 
> action(name, fn)  
> // name 作为一个注释更好地让其他人理解这个 action 的意图
> 
> @action classMethod() {}
> 
> @action(name) classMethod () {}
> 
> @action boundClassMethod = (args) => { body }
> 
> @action(name) boundClassMethod = (args) => { body }
> 
> @action.bound classMethod() {}
> 
> @action.bound(function() {})

注意：**action只能影响正在运行的函数，而无法影响当前函数调用的异步操作**

```js
@action createRandomContact() {
  this.pendingRequestCount++;
  superagent
    .get('https://randomuser.me/api/')
    .set('Accept', 'application/json')
    // 注意这里
    .end(action("createRandomContact-callback", (error, 
    results) => {
      if (error)
        console.error(error);
      else {
        const data = JSON.parse(results.text).results[0];
        const contact = new Contact(this, data.dob, data.name, data.login.username, data.picture);
        contact.addTag('random-user');
        this.contacts.push(contact);
        this.pendingRequestCount--;
      }
  }));
}

```

在 end 中触发的回调函数，被 action 给包裹了，这就很好验证了上面加粗的那句话，action 无法影响当前函数调用的异步操作，而这个回调毫无疑问是一个异步操作，所以必须再用一个 action 来包裹住它，这样程序才不会报错。

如果你使用 `async function` 来处理业务，那么我们可以使用 `runInAction` 这个 API 来解决问题。

```js
import {observable, action, useStrict, runInAction} from 'mobx';
useStrict(true);

class Store {
  @observable name = '';
  @action load = async () => {
    const data = await getData();
    runInAction(() => {
      this.name = data.name;
    });
  }
}

```

你可以把 `runInAction` 有点类似 `action(fn)()` 的语法糖，调用后，这个 `action` 方法会立刻执行。

### 3\. 其他常用API

#### useLocalStore

`mobx-react` 中介绍：

> Local observable state can be introduced by using the useLocalStore hook, that runs once to create an observable store.

`useLocalStore` 生成 MobX store，其内部也是使用 `observable` 定义可观察状态。

```js
import React, { useMemo } from "react";
import { observable } from "mobx";
import { observer,  useLocalStore } from "mobx-react";

const Counter = () => {
  const store = useLocalStore(() => ({
    count: 0
  }));
  // 等价于下面
  // const store = useMemo(() => observable({ count: 0 }), []);
  return (
    <button onClick={() => store.count++}>
      {store.count}
    </button>
  )
};

export default observer(Counter);

```

#### useObserver vs Observer vs observer

在 MobX 里面有3种方法去做 observe：useObserver，Observer，observer。这三种方法的目的都是一样的，但是在使用场景和具体表现上还是有一些差别。

*   useObserver

```js
//使用useObserver
import * as React from "react";
import {useObserver, useLocalStore} from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0

function Person() {
    console.log('in useObserver');
    const person = useLocalStore(() => ({name: 'John'}))
    return useObserver(() => (
        <div>
            {person.name}
            <button onClick={() => (person.name = 'Mike')}>No! I am Mike</button>
        </div>
    ))
}

export default Person;

```

虽然只是在返回DOM的地方使用 `useObserver()`, 但是，当person.name改变的时候，整个component，也就是Person(){}都会重新render。但是，<`Observer`\>就不一样，下面看一个例子：

*   Observer

```
//使用<Observer></Observer> 
import * as React from "react";
import {Observer, useLocalStore} from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0

export default function ObservePerson() {
    console.log('in Observer');
    const person = useLocalStore(() => ({name: 'John'}))
    return (
        <div>
            The old name is: {person.name}
            <div>
                <Observer>{() => <div>{person.name}</div>}</Observer>
                <button onClick={() => (person.name = 'Mike')}>
                    I want to be Mike
                </button>
            </div>
        </div>
    )
}

```

在这个例子里，我们有2个地方显示person.name, 但是这2处的区别是第二处使用了<`Observer`\></`Observer`\>去包裹。当我们点击按钮，从而使得person.name发生改变的时候，会有3点表现从而来体现了的特性。这三点表现就是：

1：整个component不会重新render

2：第一处{person.name}不会改变，页面上依然显示'John'

3: 第二处{() =>

{person.name}

}会改变，页面上显示'Mike

从这里我们就可以看出来可以使你更精细地控制你希望重新render的component。

*   observer

observer用来 `observe` 一个高阶组件HOC（high order component）。看一下语法：

```
observer<P>(baseComponent: React.FC<P>, options?: IObserverOptions): React.FC<P>

```

看一个实际的例子：

```js
//observer
import * as React from "react";
import {observer, useLocalStore} from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0

const ObserverLowercasePerson: React.FC<any> = observer(() => {
    const person = useLocalStore(() => ({name: 'John'}));
    return (
        <div>
            <div>The name is: {person.name}</div>
            <button onClick={() => (person.name = 'Mike')}>
                Change name
            </button>
        </div>
    )
})

export default ObserverLowercasePerson;

```