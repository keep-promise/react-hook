## useTransition

在 React v18 中，有一种新概念叫做过渡任务，这种任务是对比立即更新任务而产生的，
1. 立即更新任务: 通常一些影响用户交互直观响应的任务，例如按键，点击，输入等，这些任务需要视图上立即响应，所以可以称之为立即更新的任务

2. 过渡任务: 但是有一些更新不是那么急迫，比如页面从一个状态过渡到另外一个状态，这些任务就叫做过渡任务。打个比方如下图当点击 tab 从 tab1 切换到 tab2 的时候，本质上产生了两个更新任务。

第一个就是 hover 状态由 tab1 变成 tab2。

第二个就是内容区域由 tab1 内容变换到 tab2 内容。

这两个任务，用户肯定希望 hover 状态的响应更迅速，而内容的响应有可能还需要请求数据等操作，所以更新状态并不是立马生效，通常还会有一些 loading 效果。所以第一个任务作为立即执行任务，而第二个任务就可以视为过渡任务。

