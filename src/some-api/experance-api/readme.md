**下列api当前仅在 React Canary 与 experimental 渠道中可用**

## preconnect 
可以帮助提前连接到一个期望从中加载资源的服务器。
```js
import { preconnect } from 'react-dom';
preconnect("https://example.com");
```
preconnect 不返回任何值

## prefetchDNS
允许提前查找期望从中加载资源的服务器的 IP。
```js
import { prefetchDNS } from 'react-dom';
prefetchDNS("https://example.com");
```
prefetchDNS 不返回任何值

## preinit 
可以预获取样式表或外部脚本并执行。
```js
import { preinit } from 'react-dom';
preinit("https://example.com/script.js", {as: "style"});
```
preinit 函数向浏览器提供一个提示，告诉它应该**开始下载并执行给定的资源**，这可以节省时间。preinit 的脚本在下载完成后执行。预初始化的样式表被插入到文档中，这会使它们立即生效

### 参数 
href：字符串，要下载并执行的资源的 URL。
options：对象，可以包含以下属性：
  as：必需的字符串，表示资源的类型，可能的值包括 script 与 style。
  precedence：字符串，与样式表一起使用时必需。指定样式表相对于其他样式表的插入位置。具有较高优先级的样式表可以覆盖具有较低优先级的样式表，可能的值包括 reset、low、medium 与 high。
  crossOrigin：字符串，表示要使用的 CORS 策略，可能的值为 anonymous 与 use-credentials。
  integrity：字符串，为资源的加密哈希，用于 验证其真实性。
  nonce：字符串，表示使用严格内容安全策略时允许资源的 加密随机数。
  fetchPriority：字符串，表示建议获取资源的相对优先级，可能的值为 auto（默认值）、high 与 low

preinit 不返回任何值。


## preinitModule 
可以预获取 ESM 模块并执行。
```js
import { preinitModule } from 'react-dom';

function AppRoot() {
  preinitModule("https://example.com/module.js", {as: "script"});
  // ……
}
```
### 参数 
href：字符串，要下载并执行的模块的 URL。
options：对象，可以包含以下属性：
  as：必需的字符串，只能是 script。
  crossOrigin：字符串，表示要使用的 CORS 策略，可能的值为 anonymous 与 use-credentials。
  integrity：字符串，为资源的加密哈希，用于 验证其真实性。
  nonce：字符串，表示使用严格内容安全策略时允许资源的 加密随机数。

preinitModule 不返回任何值

preload 
可以预获取期望使用的资源，比如样式表、字体或外部脚本

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/script.js", {as: "script"});
  preload("https://example.com/style.css", {as: "style"});
  preload("https://example.com/font.woff2", {as: "font"});
  preload("/banner.png", {
    as: "image",
    imageSrcSet: "/banner512.png 512w, /banner1024.png 1024w",
    imageSizes: "(max-width: 512px) 512px, 1024px",
  });
  // ……
}
```

参数 
href：字符串，要下载的资源的 URL。
options：对象，可以包含以下属性：
  as：必需的字符串，表示资源的类型，可能的值 包括 audio、document、embed、fetch、font、image、object、script、style、track、video 与 worker。

  crossOrigin：字符串，表示要使用的 CORS 策略，可能的值为 anonymous 与 use-credentials。当 as 设置为 "fetch" 时是必需的。

  referrerPolicy：字符串，表示在获取时发送的 referer 请求头，可能的值为 no-referrer-when-downgrade（默认值）、no-referrer、origin、origin-when-cross-origin 与 unsafe-url。

  integrity：字符串，为资源的加密哈希，用于 验证其真实性。

  type：字符串，表示资源的 MIME 类型。
  nonce：字符串，表示使用严格内容安全策略时允许资源的 加密随机数。
  fetchPriority：字符串，为获取资源建议的相对优先级，可能的值为 auto（默认值）、high 与 low。
  imageSrcSet：字符串，仅与 as: "image" 一起使用，用于指定 图像的源集。
  imageSizes：字符串，仅与 as: "image" 一起使用，用于指定 图像的尺寸。

preload 不返回任何值


## preloadModule
可以急切地预获取期望使用的 ESM 模块。
```js
import { preloadModule } from 'react-dom';

function AppRoot() {
  preloadModule("https://example.com/module.js", {as: "script"});
  // ……
}
```

参数 
  href：字符串，要下载的资源的 URL。
  options：对象，可以包含以下属性：
    as：必需的字符串，表示资源的类型，可能的值 包括 audio、document、embed、fetch、font、image、object、script、style、track、video 与 worker。
    crossOrigin：字符串，表示要使用的 CORS 策略，可能的值为 anonymous 与 use-credentials。当 as 设置为 "fetch" 时是必需的。
    integrity：字符串，为资源的加密哈希，用于 验证其真实性。
    nonce：字符串，表示使用严格内容安全策略时允许资源的 加密随机数。
    Returns 
  
preloadModule 不返回任何值
