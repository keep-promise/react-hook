import React, { Component, PureComponent } from 'react';

class A1 extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      b: {
        c:1
      }
    }
  }

  pureClick = () => {
    const { a, b } = this.state;
    b.c = 2;
    b.a = 3;
    // this.setState({ a: a + 1 }); // a变化，重新render
    this.setState({ b: b }); // b引用地址不变，浅比较，不会render
  }

  render() {
    console.log('PureComponent render');
    return <div>
      <span>PureComponent</span>
      <button onClick={this.pureClick}>PureComponent+</button>
    </div>
  }
}

class A2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      b: {
        c:1
      }
    }
  }
  
  click = () => {
    const { a, b } = this.state;
    b.c = 2;
    b.a = 3;
    // this.setState({ a: a + 1 }); // a变化，重新render
    this.setState({ b: b }); // b对象内部属性变化，深比较，会render
  }

  render() {
    console.log('Component render');
    return <div>
      <span>Component</span>
      <button onClick={this.click}>Component+</button>
    </div>
  }

}


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      deepObj: {
        a: {
          c: 1
        }
      }
    }
  }


  onClick = () => {
    const { count, deepObj } = this.state;
    deepObj.a.c = deepObj.a.c + 1;
    deepObj.b = 2
    // deepObj.a = 22;
    // const _deepobj = { 
    //   a: {
    //     c: 1
    //   }
    // };
    // this.setState({ count: count + 1 });
    this.setState({ deepObj: deepObj });
  }

  render() {
    const { count, deepObj } = this.state;
    return (<>
      <div>{count}</div>
      <div>{JSON.stringify(deepObj)}</div>
      <button onClick={this.onClick}>+</button>
      <A1
        a={deepObj}
      ></A1>
      <A2></A2>
    </>)
  }
}

// PureComponent其实就是一个继承自Component的子类，
// 会自动加载shouldComponentUpdate函数。当组件需要更新的时候，

// shouldComponentUpdate会对组件的props和state进行一次浅比较。
// 1. props、state引用地址没有变化就不会render
// 2. 基本类型直接比较是否相等，相等PureComponenet不会render


// 如果props和state都没有发生变化，那么render方法也就不会出发，
// 当然也就省去了之后的虚拟dom的生成和对比，在react性能方面得到了优化。
