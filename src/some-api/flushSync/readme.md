# flushSync 同步更新state

使用 flushSync 是不常见的行为，并且可能损伤应用程序的性能。

flushSync 允许你强制 React 在提供的回调函数内同步刷新任何更新，这将确保 DOM 立即更新。

flushSync(callback)

**调用 flushSync 强制 React 刷新所有挂起的工作，并同步更新 DOM。**

callback：一个函数。React 会立即调用这个回调函数，并同步刷新其中包含的任何更新。它也可能会刷新任何挂起的更新、Effect 或 Effect 内部的更新。如果因为调用 flushSync 而导致更新挂起（suspend），则可能会重新显示后备方案

```js

import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
});
```

大多数时候都不需要使用 flushSync，请将其作为最后的手段使用。


