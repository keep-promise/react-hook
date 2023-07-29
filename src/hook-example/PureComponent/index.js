import React, { Component, PureComponent } from 'react';

class App1 extends PureComponent {
  render() {
    console.log('PureComponent render');
    return <div>PureComponent</div>
  }
}

class App2 extends Component {
  render() {
    console.log('Component render');
    return <div>Component</div>
  }
}


export default class sApp extends Component {
  
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
    // deepObj.a.c = deepObj.a.c + 1;
    // deepObj.b = 2
    // deepObj.a = 22;
    const _deepobj = { 
      a: {
        c: 1
      }
    };
    // this.setState({ count: count + 1 });
    this.setState({ deepObj: _deepobj });
  }

  render() {
    const { count, deepObj } = this.state;
    return (<>
      <div>{count}</div>
      <div>{JSON.stringify(deepObj)}</div>
      <button onClick={this.onClick}>+</button>
      <App1
        a={deepObj}
      ></App1>
      <App2></App2>
    </>)
  }
}

// PureComponent其实就是一个继承自Component的子类，
// 会自动加载shouldComponentUpdate函数。当组件需要更新的时候，
// shouldComponentUpdate会对组件的props和state进行一次浅比较。
// 如果props和state都没有发生变化，那么render方法也就不会出发，
// 当然也就省去了之后的虚拟dom的生成和对比，在react性能方面得到了优化。
