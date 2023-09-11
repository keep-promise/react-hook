import { Component, forwardRef, useState, useEffect, useRef, useImperativeHandle} from "react";

// 1-----------------函数组件ref丢失类组件可以获取-----------------
// 类组件
class ChildClass extends Component {
  render() {
    return (
      <div>
        <button>class Component</button>
      </div>
    );
  }
}

// 函数组件
function ChildFunction() {
  return (
    <div>
      <button>function Component</button>       
    </div>
  )
}

function App1() {
  // ref指向的是子组件本身
  const childClassRef = useRef(null);
  const childFunctionref = useRef(null);

  useEffect(() => {
    console.log('类组件childClassRef', childClassRef) // {current: Child}
    console.log('函数组件childFunctionref', childFunctionref) // {current: null}
    // 子组件是class组件可以直接获取子组件ref {current: Child}
    // 子组件是函数组件不能直接获得ref {current: null}
    // useImperativeHandle 和 forwardRef 配合可以解决这个问题
  }, []);

  return (
    <div styleName="container">
      <ChildClass ref={childClassRef} />
      <ChildFunction ref={childFunctionref} />
    </div>
  );
}


// 2-----------class组件传参绑定组件dom-----------------


class Child extends Component {
  render() {
    return (
      <div>
        <button ref={this.props.buttonRef}>点我</button>
      </div>
    );
  }
}

function App2() {
  const child = useRef();

  useEffect(() => {
    console.log('child', child);
  }, []);

  return (
    <div styleName="container">
      <Child buttonRef={child} />
    </div>
  );
}

 
// 3--------------------forwardRef传递ref-----------------------s

const Child3 = forwardRef((props, ref) => {
  console.log('child3 props', props)
  return (
    <div>
      <button ref={ref}>点我</button>
    </div>
  );
});


function App3() {
  const child = useRef();

  useEffect(() => {
    console.log('forwardRef fun', child);
  }, []);

  return (
    <div styleName="container">
      <Child3 ref={child} />
    </div>
  );
}


// 4----------------forwardRef+useImperativeHandle--------------------------

const SubComponent = (props) => {
  const childRef = useRef();
  const { parentRef, ...rest } = props;

  // 封装供外部主动调用的接口
  useImperativeHandle(parentRef, () => ({
    toggleStatus: () => {
      childRef.current.onToggleStatus();
    },
    getStatus: () => {
      return childRef?.current?.state?.status;
    },
  }));

  return <div {...rest} ref={childRef}>SubComponent</div>;
};

const ForwardRefSubComponent = forwardRef((props, ref) => {
  return <SubComponent {...props} parentRef={ref} />;
});

function App4() {
  const ref = useRef();

  useEffect(() => {
    console.log("App4 useEffect", ref); 
    // current: {
    //   toggleStatus: () => {
    //     childRef.current.onToggleStatus();
    //   },
    //   getStatus: () => {
    //     return childRef?.current?.state?.status;
    //   },
    // }
  }, []);

  return <ForwardRefSubComponent ref={ref} />
}

// 5----------------forwardRef+useImperativeHandle--------------------------

function Son (props,ref) {
  const inputRef = useRef(null)
  const [ inputValue , setInputValue ] = useState('')

  useImperativeHandle(ref,()=>{
    const handleRefs = {
      /* 声明方法用于聚焦input框 */
      onFocus(){
        inputRef.current.focus()
      },
      /* 声明方法用于改变input的值 */
      onChangeValue(value){
          setInputValue(value)
      }
    }; // {onFocus: ƒ, onChangeValue: ƒ}
    return handleRefs
  },[]);

  return <div>
      <input
          placeholder="请输入内容"
          ref={inputRef}
          value={inputValue}
      />
  </div>
}

const ForwarSon = forwardRef(Son)

class App5 extends Component{
  inputRef = null
  handerClick(){
    const { onFocus , onChangeValue } =this.inputRef;
    console.log('inputRef', this.inputRef); // {onFocus: ƒ, onChangeValue: ƒ}
    onFocus()
    onChangeValue('let us learn React!')
  }
  render(){
      return <div style={{ marginTop:'50px' }} >
          <ForwarSon ref={node => (this.inputRef = node)} />
          <button onClick={this.handerClick.bind(this)} >操控子组件</button>
      </div>
  }
}


export default App5;


/**
useImperativeHandle可以让你在使用ref时自定义暴露给父组件的实例值。
在大多数情况下，应当避免使用ref这样的命令式代码。
useImperativeHandle应当与forwardRef一起使用。


通过useImperativeHandle可以只暴露特定的操作
通过useImperativeHandle的Hook, 将父组件传入的ref和useImperativeHandle
第二个参数返回的对象绑定到了一起
所以在父组件中, 调用inputRef.current时, 实际上是返回的对象
useImperativeHandle使用简单总结:
作用: 减少暴露给父组件获取的DOM元素属性, 只暴露给父组件需要用到的DOM方法
参数1: 父组件传递的ref属性
参数2: 返回一个对象, 以供给父组件中通过ref.current调用该对象中的方法

 */
