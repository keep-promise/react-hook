 

# Context


## 一、Context概述


*   Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
*   如果多个组件中都需要这个值 或者 获取值和使用值的层级相隔很远，就可以使用Context(上下文)来共享数据。
*   如：地区偏好，UI 主题、当前认证的用户、语言等
*   谨慎使用，这会使组件的复用性变差

## 二、Context API

### React.createContext

```js
import { createContext } from 'react';
const MyContext = createContext(defaultValue);
```

*  创建一个 Context 对象
*  提供一个默认值
默认值作用：当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效

### Context.Provider

```js
import { createContext } from 'react';
const MyContext = createContext(defaultValue);

<MyContext.Provider value={xxx}> ... </MyContext.Provider>

```

*   每个 Context 对象都会返回一个 Provider React 组件
*   Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以对应多个消费组件。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
*   value 值发生变化时，它内部的所有消费组件都会重新渲染

### Class.contextType

```js
MyClass.contextType = MyContext;
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
```

*   挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象
通过this.context可以访问
*   可以在任意生命周期中访问

### Context.Consumer

```js
<MyContext.Consumer>
   {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>

```

*   消费组件(子组件)中使用value
*   函数作为子元素；这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。

### Context.displayName

```js
const MyContext = React.createContext();
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> 
// 在 DevTools 中显示的标签：MyDisplayName.Provider  
<MyContext.Consumer>
// 在 DevTools 中显示的标签：MyDisplayName.Consumer  

// 如果没有 MyContext.displayName = 'MyDisplayName' ，则显示Context.Provider、Context.Consumer
```

*   在 DevTools 中需要显示的内容

### 三、使用

#### 1.自定义Context (类组件中使用)

```js
//ThemeContext.js
import React from 'react'
export const ThemeContext = React.createContext('light')

//themed-button.js
//在需要的位置使用 Class.contextType
import React, { Component } from 'react';
import ThemeContext from "./context/ThemeContext.js";

class ThemedButton extends Component {
	static contextType = ThemeContext;
  // 等价 ThemedButton.contextType = ThemeContext;
	render() {
		return <button>{this.context}</button>;
	}
}
export default ThemedButton

//app.js
//上下文包裹组件 Context.Provider
import ThemeContext from './context/ThemeContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';
 
function App() {
  return (
    <ThemeContext.Provider value='dark'> //dark将默认值light覆盖
      <div className="App">
        <header className="App-header">
          <ThemedButton />
        </header>
      </div>
    </ThemeContext.Provider>
  );
}
 
export default App;

```

#### 2\. 使用Consumer支持获取多个Context上的值

*   需要多个上下文的值时可以使用Consumer

```js
//ThemeContext.js
import React from 'react'
const ThemeContext = React.createContext('light')
ThemeContext.displayName = 'ThemeContext'
export default ThemeContext

//UserContext.js
import React from 'react'
const UserContext = React.createContext('guest')
UserContext.displayName = 'UserContext'
export default UserContext

//app.js
//使用Provider赋值：
import React, { Component } from 'react';
import ThemeContext from './context/ThemeContext.js';
import UserContext from './context/UserContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';
 
class App extends Component {
 
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
        <ThemeContext.Provider value={'dark'}>
          <div className="App">
            <UserContext.Provider value={'user'}>
              <header className="App-header">
                <ThemedButton />
              </header>
            </UserContext.Provider>
          </div>
        </ThemeContext.Provider>
    );
  }
}
 
export default App

//themed-button.js
import React, { Component } from 'react';
import ThemeContext from "./context/ThemeContext.js";
import UserContext from "./context/UserContext.js";
 
class ThemedButton extends Component {
 
	render() {
		return (
			<>
				<ThemeContext.Consumer>
					{theme => <div>{theme}</div>}
				</ThemeContext.Consumer>
				<UserContext.Consumer>
					{user => <div>{user}</div>}
				</UserContext.Consumer>
			</>
		);
	}
}
 
export default ThemedButton

```

#### 3.useContext使用 （函数式组件中使用）

*   react原生Hook ,让函数式组件也可以使用Context,而且支持多个不同类型的context

```js
//ThemeContext.js
import React from 'react'
const ThemeContext = React.createContext('light')
ThemeContext.displayName = 'ThemeContext'
export default ThemeContext

//UserContext.js
import React from 'react'
const UserContext = React.createContext('guest')
UserContext.displayName = 'UserContext'
export default UserContext

//app.js
//使用Provider赋值：
import React, { Component } from 'react';
import ThemeContext from './context/ThemeContext.js';
import UserContext from './context/UserContext.js';
import ThemedButton from './ThemedButton.js';
import './App.css';
 
const App = () => {
 
  render() {
    return (
        <ThemeContext.Provider value={'dark'}>
          <div className="App">
            <UserContext.Provider value={'user'}>
              <header className="App-header">
                <ThemedButton />
              </header>
            </UserContext.Provider>
          </div>
        </ThemeContext.Provider>
    );
  }
}
 
export default App

//themed-button.js
import { useContext } from 'react'
import ThemeContext  from './context/ThemeContext'
import UserContext from './context/UserContext'

const ThemedButton = () => {
 const theme = useContext(ThemeContext)
 const user = useContext(UserContext)
 return (
    <>
		<div>{theme}</div>
		<div>{user}</div>
	</>

 )
}

export default ThemedButton


```
