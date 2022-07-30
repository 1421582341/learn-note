# 性能优化相关知识
## Dom渲染步骤

1. 解析HTML生成DOM树
2. 解析CSS生成CSSOM树
3. 根据DOM树和CSSOM树构建render树
4. 布局绘制render树

渲染引擎为了尽可能快地将结果显示，它会在从网络层获取文档内容的同时把已经接收到的局部展示出来

CSS和DOM解析互不影响，但是CSS会阻塞页面的渲染，原因是浏览器为了用户的体验会尽可能减少渲染次数

js如果需要操作dom的样式，那么就需要等待CSS下载，所以如果js不需要操作样式，将script标签置于link之上可能会更好

js会阻塞dom的解析，在确定脚本没必要阻塞dom的情况下，加上defer或者async属性

不过现在的浏览器会先寻找link、script、img标签，会先行下载

## 懒加载方案实现

1. 脚本类型模块(type="module")在默认情况下会被延迟。
2. 可以使用import()函数动态加载模块
3. CSS文件应尽可能压缩简化，不必要的CSS拆分为其他文件
4. 通过link标签的media媒体查询标签实现阻塞渲染优化，浏览器默认每个指定样式表都是阻塞渲染的，特定场景使用的样式将会被下载但不会阻塞，这样样式表文件会变得更小，从而减少渲染阻塞时间
5. 使用\<link rel="preload"\>、font-display属性或者font loading API（动态加载字体资源时的事件和接口）
6. 使用`loading="lazy"`属性实现iframe和img的懒加载，值得注意的是这些资源会在迫切需要加载的资源加载后才懒加载
7. 交叉观察者API(Intersection Observers)


## CSS性能优化

1. 将动画化的节点从主线程移到GPU上，导致合成的属性包括(3D transform,animating transform opacity position:fixed will-change filter)，元素video、canvas、iframe也会合成。
2. 媒体查询（详见懒加载方案）
3. will-change属性，通过实际更改前执行耗时的工作以提升性能
4. @font-face中的font-display可以依靠这种无样式文本闪现使文本可见替代白屏提高性能
5. contain属性用于指示dom中尽可能独立的部分，允许浏览器针对有限区域重新计算布局

## 异步渲染

vue更新dom是异步执行的。侦听到数据变化时，vue会开启一个异步更新队列，缓冲在同一事件循环中发生的所有数据变更。这有利于去除重复数据和避免不必要的计算和Dom操作

## 服务端渲染（待深究）

服务端直接生成html片段返回前端，方式分为两种：

1. 服务器通过模板引擎直接渲染整个页面
2. 服务器生成html代码块，前端通过ajax获取后js动态添加

优势：
* 有助于SEO
* 加速首屏渲染

劣势：
* 服务器压力大