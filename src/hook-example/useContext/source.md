# context原理解析
context 是 react 的主要特性，它能在任意层级的组件之间传递数据。

在业务代码中用 context 可能不多，大家更偏向于全局的状态管理库，比如 redux、mobx，但在 antd 等组件库里用的特别多。

那 antd 组件库是怎么用 context 


## context 的用法：

### createContext

```js
import { createContext } from 'react';

const countContext = createContext(111);

```

任意层级的组件可以从中取值：

### useContext[函数组件中使用]

```js
import { useContext } from 'react';

function Ccc() {
  const count = useContext(countContext);
  return <h2>context 值为：{count}</h2>
}

```

![](https://pic1.zhimg.com/v2-c1d62ffba517ac093a1e39039ef626a8_r.jpg)

### Consumer

```js
import { createContext, Component } from 'react';

const countContext = createContext(111);

class Ccc extends Component {
  render() {
    return <h2>context 的 值为：{this.props.count}</h2>
  }
}

function Bbb() {
  return <div>
    <countContext.Consumer>{
        (count) => <Ccc count={count}></Ccc>
      }
    </countContext.Consumer>
  </div>
}

```

![](https://pic3.zhimg.com/v2-2764131bbc840a5a608c4a2d7558662a_r.jpg)

### Provider 修改 context

```js
import { createContext } from 'react';

const countContext = createContext(111);

function Bbb() {
  return <div>
      <countContext.Provider value={333}>
        <Ccc></Ccc>
      </countContext.Provider>
  </div>
} 

```

![](https://pic1.zhimg.com/v2-32a90ad7b69e9c345a2aa1280c09f1a0_r.jpg)

### context 使用总结
1. 用 createContext 创建 context 对象
2. 用 Provider 修改其中的值
3. function 组件使用 useContext 的 hook 来取值
4. class 组件使用 Consumer 来取值

这样的 context 机制就能实现任意层级的传值，比如这样三层组件：

```js
import { createContext, useContext } from 'react';

const countContext = createContext(111);

function Aaa() {
  return <div>
      <countContext.Provider value={222}>
        <Bbb></Bbb>
      </countContext.Provider>
  </div>
} 

function Bbb() {
  return <div><Ccc></Ccc></div>
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context 的值为：{count}</h2>
}

export default Aaa;

```

在 Aaa 组件中修改后的 context 值就能被 Ccc 组件拿到：

![](https://pic4.zhimg.com/v2-2e15b3c3e4c9ed5b15ebe43ef13ba67b_r.jpg)


antd 里就有大量的 context 应用，只是你不知道而已

```js
import { Form, Input } from 'antd';
import { useEffect } from 'react';

const App = () => {
  const [form]= Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      a: {
        b: {
          c: 'ccc'
        }
      },
      d: {
        e : 'eee'
      }
    })
  }, []);

  return (
    <Form form={form}>
      <Form.Item name={['d', 'e']}>
        <Input/>
      </Form.Item>
    </Form>
  )
}
export default App;

```

通过 useForm 拿到 form 对象，设置到 Form 组件里，然后用 form.setFieldsValue 设置的字段值就能在 Form.Item 里取到。

Form.Item 只需要在 name 里填写字段所在的路径就行，也就是['d', 'e'] 这个。

![](https://pic2.zhimg.com/v2-40b4b65f60a3f02cde7ad6aa812a0939_r.jpg)

有的同学可能会问了，为啥这里只设置了个 name，它下面的 Input 就有值了呢？

我们让 Form.Item 渲染一个自定义的组件试一下，比如这样：

![](https://pic3.zhimg.com/v2-bd3623d9c227b0ad2d72927614fb298e_r.jpg)

发现传入了 **id、value、onChange** 3 个参数：

![](https://pic2.zhimg.com/v2-cf34a6f38ab18450d140d19fc77bffed_r.jpg)

这就是为啥 Input 能有值，因为传入了 value 参数。

而且变化了也能同步到 fields，因为传入了 onChange 参数。

有的时候我们要对保存的值做一些修改，就可以这样写：

```js
function MyInput(props) {
    const { value, onChange } = props;
    function onValueChange(event) {
      onChange(event.target.value.toUpperCase());
    }
    return <Input value={value} onChange={onValueChange}></Input>
}
```

我们调用 form.getFieldsValue 方法看看 onChange 前后的变化：

![](https://pic1.zhimg.com/v2-c67985e67fcdc78e7d0cba046a01c720_r.jpg)

这时候 value 也会变，最终会改变表单的值：

![](https://pic4.zhimg.com/v2-7387d18d3b96baad68f9e0ec27183697_r.jpg)

所以说，Form.Item 会给子组件传入 value、onChange 参数用来设置值和接受值的改变，同步到 form 的 fields。

那这跟 context 有什么关系呢？

当然有呀，Form.Item 是怎么拿到 form 对象的呢？我们不是只传给了 Form 组件么，怎么会到了 Form.Item 手里的？

![](https://pic3.zhimg.com/v2-200ead525120340e5fc643dd33567f26_r.jpg)

传递 form 对象的 context，Form 组件往其中设置值，Item 组件从其中取值

![](https://pic3.zhimg.com/v2-05da0fe73909e973c86da775a05ff8f6_r.jpg)

Form 组件里用 useForm 创建了 form 对象，参数为 props 传入的 form。

然后它把这个 form 对象通过 Provider 放到了 FieldContext 里：

![](https://pic1.zhimg.com/v2-c0ad8fffc2acd6fc6ebf1a8b8ad3b590_r.jpg)

这个 FieldContext 自然是通过 createContext 的 api 创建的：

![](https://pic2.zhimg.com/v2-6617d9eef93ec9251f3cbe06036b20bd_r.jpg)

fieldContext 里就有 getFieldsValue、setFieldsValue 等 form 对象的方法了。

然后就是 Form.Item 了。

其实 Form.Item 里也渲染了一系列组件，主要是处理布局，这个用 React DevTools 调试下就知道了：

![](https://pic2.zhimg.com/v2-3af07371d776947931abe794fe338fb1_r.jpg)

FormItem 加上了 Row、Col 等组件来布局，还加上了 Label 的部分，最后再渲染传入的 children。

其中有个 WrappedField 的子组件，这里面就取出了 FieldContext，作为参数传给了子组件：

![](https://pic2.zhimg.com/v2-cd2e2393f7a0f0c1a3cc944dddc3da79_r.jpg)

而 namePath 也就是 ['d', 'e'] 的部分已经有了。

从 filedContext 里用 getFiledsValue 取出全部的 store，然后再通过 namePath 取出想要的值传给子组件，这不就完成了 Form.Item 的功能了么？

![](https://pic1.zhimg.com/v2-9e1d2eca522141341a628febe6a5215c_r.jpg)

这就是为什么 form 里设置了 fields，在 Form.Item 里就能取出值来的原因。

小结一下：antd 的 Form 通过 FieldContext 保存了 form 对象，在 FormItem 组件里取出 FieldContext，并根据 namePath 取出对应的值，传递给子组件。这就完成了 form 的 field 值的设置。

除了 FieldContext 外，还有很多别的 Context，比如 size、disabled 等都是通过 context 存储和传递的：

![](https://pic1.zhimg.com/v2-7bc184910fa09b1d9d44eb6098d4955c_r.jpg)

![](https://pic4.zhimg.com/v2-4866e79e81997da6a5f9bbed1ecd1f1f_r.jpg)

![](https://pic1.zhimg.com/v2-bc22eeb45f52c170d6e93a209e19f014_r.jpg)

在 antd 组件库里，context 有大量的应用。

那么 context 是怎么实现的呢？

这个要从源码找答案了。

首先是 createContext 方法，这个方法返回的是一个对象，记住这 3 个属性就可以了：

1. _currentValue： 保存 context 的值的地方，不建议直接改

2. Provider： ContextProvider 类型的 jsx

3. Consumer： ContextConsumer 类型的 jsx

![](https://pic4.zhimg.com/v2-9d5c2b89f184214940a8b10709162ac3_r.jpg)

也就是说这些 Provider、Consumer 都是单独的 jsx 类型：

![](https://pic4.zhimg.com/v2-4866e79e81997da6a5f9bbed1ecd1f1f_r.jpg)

react 渲染的时候会把 jsx 编译成 render function，然后执行之后就是 vdom：

![](https://pic3.zhimg.com/v2-98f3d06887db6ff053eaf36a68a86242_r.jpg)

image.png

vdom 是这样的结构，在 react 里也就是 ReactElement 对象：

![](https://pic1.zhimg.com/v2-07009a905cbff30220421d0afc0c640c_r.jpg)

Provider 就会变成这样的 vdom：

![](https://pic2.zhimg.com/v2-76b219cb4be5cca3dbedc45267401689_r.jpg)

然后 vdom 会经历 reconcile 过程转为 fiber 结构，转完之后一次性 commit，也就是更改 dom。

![](https://pic1.zhimg.com/v2-d11cd657ba9221951791ed3434372b00_r.jpg)

这种 Provider 类型的 vdom 自然会转为对应的 fiber 节点，在 reconcile 的时候会做单独的处理：

![](https://pic1.zhimg.com/v2-74ad08a7327f282c9adf406791d60230_r.jpg)

可以看到 Provider 的处理就是修改了 context._currentValue 的值：

![](https://pic3.zhimg.com/v2-1bd1c0d38229da95183f864dac0679f6_r.jpg)

也就是说其实我们可以不用 Provider，自己修改 \_currentValue 也可以。

![](https://pic1.zhimg.com/v2-5a1ab83421e8a52c98d94200737b9fb0_r.jpg)

这种是不建议的。

总之，Provider 的原理就是修改了 context._currentValue。

然后再来看 useContext：

很容易想到，它就是读取了 context.\_currentValue 返回：

![](https://pic3.zhimg.com/v2-f9e35a51f19c063b4bfb1d2ac734f2b6_r.jpg)

![](https://pic4.zhimg.com/v2-e8f972f16336e9f08b6eed4c96cbfe33_r.jpg)

Consumer 的原理自然也差不多，也是读取了 context.\_currentValue，然后传入组件渲染：

![](https://pic1.zhimg.com/v2-9caae8edda3d35e1e5352c32cb5d5538_r.jpg)

那有的同学可能会问了，这不就是一个全局的对象么，然后 Provider 修改它的属性，Consumer 或者 useContext 读取它的属性。

这个自己封装不也行么？

还真不行。

因为 context 还有一个特别重要的特性：

比如这样的代码：

```js
import { createContext, useContext } from 'react';

const countContext = createContext(111);

function Aaa() {
  const count = useContext(countContext);

  return <div>
      <h1>context 的 值为：{count}</h1>
      <Bbb></Bbb>
  </div>
} 

function Bbb() {
  return <div>
      <countContext.Provider value={222}>
        <Ccc></Ccc>
      </countContext.Provider>
    </div>
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context 的 值为：{count}</h2>
}

export default Aaa;

```

也就是说在中间的组件里修改了 context 的值，那如果 context 是全局的话 Aaa、Ccc 组件的值都应该修改才对。

但实际上不是：

![](https://pic3.zhimg.com/v2-88427f8436404ba4446edeb27db07a9e_r.jpg)

image.png

可以看到，只有 Ccc 拿到的 context 值被修改了，而 Aaa 拿到的 context 值没变。

这是为什么呢？

不是说都是取的 context._currentValue 这个属性么，咋还不一样了呢？

这是因为 react 对 context 还有一个处理：

![](https://pic3.zhimg.com/v2-11e3904b4dde11995428bfb46be01b2e_r.jpg)

在修改 context._currentValue 之前还有一个 push。

这个就是把当前的 context 值入栈：

![](https://pic1.zhimg.com/v2-eb0cca912f9df9439de1ef47d656a554_r.jpg)

之后处理完这个 fiber 节点会再 pop 出栈，然后恢复 context：

![](https://pic1.zhimg.com/v2-a9d26958f1ca1738332447ac2d78d83c_r.jpg)

这就是为什么 context 只能影响子组件，影响不了父组件。

这就是 context 的原理。

小结一下：

createCotnext 就是创建了一个 \_currentValue、Provider、Consumer 的对象。

\_currentValue 就是保存值的地方

Provider 是一种 jsx 类型，之后会转为对应的 fiber 类型，然后它的处理就是修改 \_currentValue，也就是修改 context 值

Consumer 和 useCotnext 就是读取 \_currentValue，也就是读取 context 值

唯一要注意的是 Provider 处理每个节点之前会入栈 context，处理完会出栈，这样就能保证 context 只影响子组件。

**总结**
------

context 是 react 的重要特性，它主要用来在任意层级组件之间传递数据。

使用方式就是用 createContext 创建 context 对象，然后用 Provider 修改值，用 useContext 和 Consumer 读取值。

context 在 antd 这种组件库里用的特别多，比如 Form 的 fields 的值的传递，form.setFeildsValue 之后 FormItem 能拿到最新值就是通过 context 取的。

context 的原理是 context 对象有 \_currentValue 属性用来保存值，Provider 会修改 \_currentValue，Consumer 和 useContext 会读取它。

只是 Provider 还会入栈出栈机制保证值的修改只影响子组件。

context 原理其实还挺简单的，也就是一个对象属性的修改和读取。

它在 antd 组件库里用的太多了，比如 form 的 fields 传递、config 传递等等。不知道 context 用在哪的话，不妨去看下 antd 源码里怎么用的吧。
