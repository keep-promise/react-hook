import React, { useMemo } from "react";
import { observable, autorun } from "mobx";
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

const value = observable(0);
const number = observable(100);

autorun(() => {
  console.log('autotun', value.get());
});

value.set(1);
value.set(2);
number.set(101);
