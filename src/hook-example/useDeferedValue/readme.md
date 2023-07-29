
## useDeferredValue
React 18 提供了 useDeferredValue 可以让状态滞后派生。useDeferredValue 的实现效果也类似于 transtion，当迫切的任务执行后，再得到新的状态，而这个新的状态就称之为 DeferredValue。

useDeferredValue 基础介绍：

useDeferredValue 和上述 useTransition 本质上有什么异同呢？

相同点： useDeferredValue 本质上和内部实现与 useTransition 一样都是标记成了过渡更新任务。

不同点： useTransition 是把 startTransition 内部的更新任务变成了过渡任务transtion,而 useDeferredValue 是把原值通过过渡任务得到新的值，这个值作为延时状态。一个是处理一段逻辑，另一个是生产一个新的状态。

useDeferredValue 接受一个参数 value ，一般为可变的 state , 返回一个延时状态 deferrredValue。

