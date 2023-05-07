## Redux组成

### State 状态
1.DomainState：服务器返回的state
2.UI State: 关于当前组件的State
3.APP State: 全局的State

### Action事件
1.本质是JS对象
2.必须包含type属性
3.只是描述有事情要发生，并没有描述如何去更新state

### Reducer
1.本质就是函数
2.响应发送过来的 action
3.函数接收两个参数，第一个是初始化 state，第二个是发送过来的 action
4.必须要有 return 返回值

### Store
1.用来把 action 和 reducer 关联到一起的
2.通过 createStore 来构建 store
3.通过 subscribe 来注册监听
4.通过 dispatch 来发送 action

#### redux和react之间没有关系
