---
nav: 问题
# group: q
---

## umi 是什么

1. umi 是一个可插拔的企业级前端框架，可以快速构建单页和多页应用
2. 他有以下几个特点：

- 约定式路由，可以使用约定式的目录结构和文件命名，实现路由的自动识别
- 插件化，提供插件系统，可以扩展框架的功能
- 构建工具链，他集成了一套前端开发的工具链，包括 Webpack,Babel,CSS 预处理器等工具
- 支持开发服务器，提供 devServer，可以使用 mock 等工具优化开发效率
- 集成了数据流管理，支持 dva，mobx 等，用户可以自己选择或者集成自己的数据流工具

## AntV 和 ECharts 有什么关系

1. AntV 中的 Ant Design Charts 或者 g2 和 ECharts 属于一类，主要是对数据进行图表展示
2. 其中 ECharts 提供了大量定制化的图表可供选择，但是他自由度没有 g2 高，如果需要更多的自定义功能，可能 g2 要好一些
3. 而且 ECharts 提供了 3d 可视化，而 g2 没有
4. ECharts 的有自定义主题配置，而 AntV 好像是没有的

## scss 和 less 区别

1. scss 和 less 都是 css 预处理语言，都具有嵌套、变量、mixin(混入)、函数
2. scss 使用$开头声明变量
3. less 使用@开头声明变量

## Webpack、Vite、Rollup 区别

1. webpack

- webpack 是一个强大的打包工具，可以支持多种 js 模块规范，通过 loader 插件可以实现对非 js 文件进行处理
- 提供插件系统，在 webpack 编译阶段会派发各种事件，能增强其功能，可以实现代码分割、静态资源优化、代码压缩，tree-shaking 功能
- 支持热更新和冷启动

2. Vite

- Vite 也是一个打包工具，他利用了浏览器原生支持的 ES 模块支持，在开发阶段不进行打包，只通过 es 模块的导入导出进行管理
- 支持热更新和冷启动
- 他在生产阶段使用 rollup 打包，利用其静态分析和 tree-shaking 对代码进行优化
- 当然他也提供强大的插件系统，可以实现对 commonjs 文件转为 esmodule 进行开发

3. Rollup

- Rollup 是专门用于 js 库和组件库的打包工具
- 他支持插件系统，能够对多种规范文件进行 打包并生成多种规范文件
- 小而快

## 原型和原型链

1. 说原型和原型链就要谈一下面向对象的思想，面向对象通过封装、继承、多态来实现对象属性和方法的共享与重写
2. 而 js 是通过原型和原型链的形式来实现面向对象的
3. 每一个构造函数[prototype] 指向 一个原型对象 （箭头函数没有原型对象）
4. 这个构造函数的实例对象的[__proto__] 指向这个原型对象（原型对象可以存放公共的属性和方法已达到复用）
5. 因为这个原型对象也是有[__proto__],所以就形成了一个链表
6. 而原型链是 在这个实例对象访问属性和方法时，会从自身开始寻找，如果找不到就会去访问[__proto__] 即
   原型对象，

## 跨域请求自定义 header

- 会触发 option 预检请求，询问服务器是否接受这个请求，主要还是为了安全问题
- 使用 CORS 配置跨域时，需要明确可接受的 header 属性

## 跨站请求 cookie 携带问题

- iframe 引入其他项目页面，第一次登录时，会保存 cookie，从而使主页面能正常加载 iframe。但是由于有一个租户的 iframe 需要携带登录信息 cookie，否则就会跳转到登录页面，但是由于 2 个站点的域名不同，属于跨站点了，不能将将 cookie 信息带过去，就会一直进入登录页面，导致不能正常使用。
- 原因是 谷歌浏览器 91 版本以后限制了 cookie samesite 的禁用，为了防止 csrf 攻击跨站请求伪造
- 所以不是同站点登录时 属于跨站请求不能将 cookie 携带上。
- 解决办法
  - 浏览器为 91 版本之前，同时进入 chrome://flags 搜索 samesite 并且禁用
  - 本地开发的时候可以将 host 配置成对应的 对应的站点，然后访问的时候使用对应 host
  - 如果是 https，直接把 cookie 的 samesite 设置为 none 即可

## 跨域和跨站

- 跨域是 只要协议名、域名、端口号、子域名都可以是跨域。www 是子域(万维网) baidu 是(域名)
- 跨站是 指 2 个站点的域名不同

## http 向 https 发送请求问题

- 将 http 请求升级成 https 请求：
  - 页面增加 `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />`

## 以下是 CSRF 攻击的一般工作原理：

1. 用户登录网站 A 并获取身份验证凭据（如 cookie）。
2. 用户在未登出网站 A 的情况下，访问恶意网站 B。
3. 恶意网站 B 中包含一个针对网站 A 的请求，该请求会在用户不知情的情况下发送给网站 A。
4. 用户的浏览器会自动携带网站 A 的身份验证凭据，将请求发送给网站 A。
5. 网站 A 接收到请求后，由于缺乏足够的验证措施，将对请求进行处理并执行相应的操作。

## react-sortable-hoc 拖拽展开表格问题

```jsx | pure
const DraggableBodyRow: React.FC<any> = ({
  className,
  style,
  ...restProps
}) => {
  // function findIndex base on Table rowKey props and should always be a right array index
  const index = dataSource.findIndex(
    (x) => x.index === restProps['data-row-key'],
  );
  //在展开表格后 body: row 的行数增加了，但是在展开的表格那一行的 data-row-key 是没有值的，这就导致了 index 没有获取到值
  // index={index < 0 ? undefined : index}
  return <SortableItem index={index} {...restProps} />;
};
```

- React 中 setState 是同步的还是异步的
  - react 中 setState 本质是同步的，但是当你在组件中调用 setState 时，React 会对更新进行排队，并在当前代码块执行完毕后，根据当前`优先级`和`调度策略`，`批量处理更新`，然后进行`一次性`的重新`渲染`
  - 如果你想 setState 的值是需要计算上一次值的话，你应该使用传递函数进去 setState((pre) => pre+1)

## vue 和 react 的区别

- 原理方法：vue 是 Object.definePropoty()对数据进行劫持，结合 v-model 实现数据的双向绑定
  react 是
- vue 使用 template 和 react 使用 jsx
- vue 数据响应式 数据可变，react 数据是不可变的
- diff 算法不同
- vue 是渐进式框架 而 react 只是一个 ui 库 函数执行 返回的 dom

## useCallback

- 原理： 他会缓存函数的引用，避免每次渲染时生成新的函数
- 使用场景：
  1. 函数作为需要传递给子组件时，使用`useCallback`缓存函数引用，子组件使用`memo`包裹可以避免子组件的重复渲染
  2. 函数作为 useEffect 的依赖项时，可以避免 useEffect 的重复执行
- 缺点：
  1. 过渡使用 useCallback 时，会导致额外的内存开销，因为缓存函数的引用会占用内存
  2. 错误使用 useCallback，可能会导致 useEffect 的错误执行

## useMemo 和 React.memo

- useMemo 不仅仅可以缓存值，也是可以缓存函数
- React.memo 不适用于`函数组件内部`状态的优化
- 函数组件内部可以使用`useMemo`进行缓存

## https 的建立过程

1. 客户端发起 https 请求
2. 服务端接收到请求，使用`ca证书`产生`【公钥和私钥】`，然后将`公钥`发送给`客户端` (采用的是`非对称加密`)
3. 客户端接收响应，开始`验证证书合法性`。

- 不合法，浏览器会给出警告信息，让客户端选择是否继续发送请求，是 -> 4
- 合法 -> 4

4. 客户端使用`对称加密算法`，生成`随机密钥KEY`，然后通过`公钥`对`随机密钥KEY`加密，再传递给服务器
5. 服务器接收后，通过`私钥`解密拿到`密钥KEY`，之后使用这个`KEY`进行`加密解密`进行数据传输

## opacity: 0、visibility: hidden、display: none 优劣和适用场景

- opacity: 占据空间，可以触发点击事件
- visibility： 占据空间，不能触发
- display: 不占空间，不能触发

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

## react 的声明周期 16

1. 挂载

- constructor
- getDerivedStateFromProps (派生 props)
- render
- componentDidMount

2. 更新

- getDerivedStateFromProps (派生 props)
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate (更新前获取快照)
- componentDidUpdate

3. 卸载

- componentWillUnmount

## vue compute 的原理

初始化时会对执行 initComputed，并对 computed 里的每个函数用 watcher 包裹，并且会为 watcher.dirtywatcher.dirty 属性设为 true，然后计算完结果后，将 dirty 修改为 false。然后 watcher 会根据其依赖的值的变化，如果有变化就会将 dirty 设为 true，然后在计算，再设为 false

egg 项目初始化
直播服务器器搭建
socket.io 服务器搭建
api 接口开发
后端部署开发
移动端前后端交互开发

兼容端：app 和微信小程序，H5 等等

调试开发

- app(真机调试) - 最好
- 微信小程序
- 模拟机


## github 分支保护

- GitHub 已经在默认情况下将默认分支的名称从 "master" 改为 "main"，以避免与语言中的不适当术语相关联。因此，在这个回答中，我会使用 "main" 分支来代替 "master" 分支。如果您仍在使用 "master" 分支，请将以下步骤应用于 "master" 分支。

要防止直接向 GitHub 的默认分支（通常是 "main"）提交代码，您可以采取以下一种或多种方法：

- 1. 分支保护（Branch Protection）：
     您可以设置分支保护来限制对默认分支的直接推送（push）。分支保护可以确保只有经过审核的代码才能合并到默认分支中。这样，您可以通过 Pull Request（PR）的方式进行代码审查和合并。

打开您的 GitHub 仓库。
点击上方的 "Settings"（设置）选项卡。
在左侧菜单中，选择 "Branches"（分支）。
在 "Branch protection rules"（分支保护规则）部分，点击 "Add rule"（添加规则）。
选择要保护的分支（例如 "main"）。
在 "Protect matching branches"（保护匹配分支）部分，选择以下选项：
"Require pull request reviews before merging"（在合并前要求审核 PR）
"Require status checks to pass before merging"（在合并前要求状态检查通过）
"Require branches to be up to date before merging"（在合并前要求分支是最新的）
禁用直接推送（Push）：

- 2. 另一种方法是禁用对默认分支的直接推送，从而只允许通过 PR 进行更改。这可以在仓库的设置中完成。

打开您的 GitHub 仓库。
点击上方的 "Settings"（设置）选项卡。
在左侧菜单中，选择 "Branches"（分支）。
在 "Branch protection rules"（分支保护规则）部分，选择默认分支（例如 "main"）。
在 "Branch protection rules for main"（主分支的分支保护规则）部分，取消选中 "Allow force pushes"（允许强制推送）和 "Allow deletions"（允许删除）。
这些方法可以帮助您防止直接向 GitHub 默认分支提交代码，从而促进代码审查和合并流程的使用。通过 Pull Request 进行代码审查有助于确保代码质量和团队合作。
