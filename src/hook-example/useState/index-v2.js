import { Component } from 'react';

class App extends Component {

  state = {
    a: 1
  }

  // 执行 btnClick1 函数，批量更新为isBatchingUpdate = true
  // btnClick1 函数没执行完，isBatchingUpdate = true 变量锁的存在，
  // 就会一直让state修改只停留在更新中状态内，一直不会更新到实际的 state上
  // btnClick1 函数完成，关闭批量更新锁 isBatchingUpdate = false，
  // 如果此时还有宏任务中更新state是同步更新

  btnClick1 = () => {
    this.setState({
        a: this.state.a + 1
    });
    this.setState({
        a: this.state.a + 1
    });
    console.log('点击时的a的值为：',this.state.a); // 1 异步更新状态, setState是异步的
  }

// btnClick2执行中isBatchingUpdate = true变量锁的存在，setTimeout中的回调函数加入到
// 宏任务队列中，btnClick2执行完成isBatchingUpdate = false, 关闭批量更新锁，更新state
// 此时开始执行宏任务，isBatchingUpdate = false，所以此时同步更新state

  btnClick2 = () => {
    setTimeout(() => {
      this.setState({
          a: this.state.a + 1
      })
      console.log('setTimeout点击时的a的值',this.state.a); // 2 同步的
    },0);
  }

  render(){
    return (
      <>
        <div>hello william</div>
        <button onClick={this.btnClick1}>点击按钮</button>
        <button onClick={this.btnClick2}>点击按钮settimeout</button>
      </>
    )
  }
}

export default App;

// isBatchingUpdate = false 同步更新
// isBatchingUpdate = true 合成后再一起更新，所以是异步更新state
