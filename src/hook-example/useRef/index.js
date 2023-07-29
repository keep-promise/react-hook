import { Component, createRef, useEffect, useRef } from "react";


class A extends Component {

  ref2 = createRef(null);

  componentDidMount() {
    console.log('this.refs', this.refs)
    console.log('ref2', this.ref2)
  }

  render() {
    return (<div ref="ref1">
      ref1
      <div ref={this.ref2}></div>
      <div ref={(dom) => console.log('dom', dom)}></div>
    </div>);
  }
}

function B() {
  const ref = useRef(null)
  useEffect(() => {
    console.log('B ref2', ref);
  }, []);
  return (<div ref={ref}></div>)
}

function C() {
  return(<>
    <A />
    <B />
  </>)
}


export default C;