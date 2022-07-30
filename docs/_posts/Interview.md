# 面试题汇总

## 闭包
设计私有的方法与变量
**优点：** 避免全局变量的污染

**缺点：** 闭包常驻内存，增大使用量，使用不当导致内存泄漏

**特点：** 

1. 函数嵌套函数
2. 内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收
   
## Cookie弊端

1. cookie有数量和大小的限制
2. 安全性问题，被拦截之后不需要破解直接原封不动地转发即可达到目的

## Cookie弊端的解决方案

1. 控制session对象的大小
2. 加密和安全传输技术（SSL）
3. 仅存放不敏感数据
4. 控制生命期，过期无效

## 浏览器本地存储

1. sessionStorage会话级别的存储，会话结束即销毁，同一个浏览器同一个页面
2. localStorage持久化本地存储，需要主动删除，所有同源窗口共享

## cookie、session、token

cookie和session用于告知服务端不同请求是否来自同一浏览器。

cookie存储在客户端，且不可跨域。一级域名和二级域名之间是允许共享使用的。

session基于cookie实现，session存在服务端，sessionId存储在客户端cookie中。

用户第一次请求服务器的时候，服务器根据提交的信息创建session并将sessionId返回。

sessionId存储在cookie中。当发起第二次请求时，会自动判断该域名下是否存在cookie信息，然后发送给服务端。服务端会获取cookie信息中的sessionId，并查找session信息。

session比cookie安全，存储在服务端比客户端安全

cookie只支持字符串，session任意，原因同上

cookie有效期比session长

cookie存储大小远小于session

客户端发起请求后，服务端会签发一个token，客户端将其存储在cookie或者localstorage中，之后发起请求都会在Http的header当中携带token，服务端用解析token的时间去换取存储session的空间，减轻负担。token完全由应用管理，可以避开同源策略。

实现有状态的会话需要session保存状态，无状态的会话即可使用token更为安全，而session只能依赖链路层来保障通信安全。

## display:none和visible:hidden

前者不会分配对应空间，后者会

## link和@import

1. HTML标签和CSS规则
2. 页面加载时，link会同时被加载，@import会在页面加载后加载
3. import有兼容问题（IE5以上）
4. link权重高于import

## absolute和float

都会脱离文档流，前者不占据位置，后者会

## box-sizing

默认值content-box

IE8以下浏览器的盒模型中定义的元素的宽高不包括内边距和边框

**content-box：** 设置宽高是指content

**border-box：** 设置宽高是指border+padding+content

## 选择器种类

1. id
2. 类
3. 标签
4. 相邻
5. 子
6. 后代
7. 通配符
8. 属性
9. 伪类
10. 标签属性
11. 伪元素

## 可继承属性

1. font-size
2. font-family
3. color
4. text-indent

## 不可继承属性

1. border
2. padding
3. margin
4. width
5. height

## 优先级

!important最高优先级

|     选择器     | 优先级 |
| :------------: | :----: |
|    行内样式    |  1000  |
|       id       |  0100  |
| 类、伪类、属性 |  0010  |
|  标签、伪元素  |  0001  |

## css3新增伪类

1. :first-of-type
2. :last-of-type
3. :only-child
4. :nth-child(even)
5. :enabled
6. :disabled

## position各值相对于什么定位

absolute相对于最近一级定位不是static的父元素定位

fixed相对于窗口定位

relative相对于普通文档流的位置定位

static默认值不定位

## css3新特性

1. border-radius
2. box-shadow
3. text-shadow
4. gradient
5. transform
6. rgba
7. border-image
8. ::selection
9. 媒体查询
10. 多栏布局


## xml和json

1. json体积小
2. json更容易被js处理
3. json描述性比较差
4. json传输速度快

## BFC

块级格式化上下文，内部样式不会影响外部

**方法：**

1. float
2. absolute和fixed
3. inline-block
4. overflow
5. table-cell

**解决问题：**

1. 外边距塌陷
2. 包含塌陷
3. 清除浮动
4. 阻止标准流元素被浮动元素覆盖

## CSS sprites

background-image + background-position + background-repeat

## Doctype类型

**混杂模式：** 很少使用，不同浏览器css渲染结果不同，省略<!DOCTYPE>可进入该模式

**标准模式：** \<!DOCTYPE html\>

**准标准模式：** 没有标准模式严格，区别在于对待图片周围空白


## HTML和XHTML

XHTML语法更严格

## 常见兼容性问题

1. png24在ie6出现背景   将其做成png8
2. 浏览器默认margin和padding不同    统一初始化样式
3. ie6双边距bug   在float的标签样式中加入_display:inline
4. 渐进式识别   在属性前加. ie678识别；加+ ie67识别；加_ ie6识别
5. Firefox只能使用getAttribute获取自定义属性
6. chrome将小于12px的中文界面文本按照12px显示   设置-webkit-text-size-adjust: none;

## 浮动工作原理

脱离文档流不占据空间，触碰到边框和其他浮动元素的边框停留

## 清除浮动

1. 空标签clear: both;
2. overflow: hidden;
3. :after伪元素

## DOM操作

1. createDocumentFragment 创建DOM片段
2. createTextNode  创建文本节点
3. replaceChild
4. insertBefore
5. getElementByTag
6. getElementsByName
7. getElementById

## IE6/7/8支持HTML5新标签

document.createElement

## iframe优缺点

**优点：** 解决加载缓慢的第三方内容如图标和广告等加载问题

**缺点：** 阻塞主页面的Onload事件

## 浏览器多个标签页内通信

1. websocket
2. shareworker
3. localstorage
4. postmessage

## 进程与线程

1. 一个程序至少一个进程，一个进程至少一个线程
2. 线程的划分尺度小于进程，多线程程序并发性高
3. 进程有独立内存单元，线程共享内存，效率高
4. 线程必须依存应用程序，应用程序提供控制
5. 多线程是多个执行部分同时进行，但操作系统将其视为整体

## null和undefined

**undefined出现情景：** 

1. 变量声明后未赋值
2. 对象上不存在属性
3. 函数定义形参没传值
4. void对表达式求值

**null出现情景：**

1. 原型链终点
2. 栈中的变量没有指向堆中的内存对象，指向为空

**误区：**

null有特有的Null类型而非Object，使用typeof判断为object是因为js底层是使用二进制表示数据类型的。对象所对应的二进制为000，而null的二进制也恰好为0，所以被误判为对象。

```js
console.log(Object.prototype.toString.call(null)); // [object Null]
```

## new操作符的具体流程

```js
function new(Func,...args) {
  let newObj = {}
  newObj.__proto__ = Func.prototype
  const result = Func.apply(newObj,args)
  return result instanceof Object ? result : newObj
}
```

## 跨域问题及解决方案

1. Jsonp跨域

    \<script\>标签不受跨域限制，通过src发送带有callback参数的get请求，服务端将接口返回数据拼凑到callback函数中，浏览器解析执行，从而拿到返回的数据

2. 跨域资源共享(CORS)

    分为简单请求和非简单请求，浏览器对这两种请求的处理不同

    **简单请求**满足以下两个条件：
    
    1. 使用head，get，post方法之一
    2. 请求的header是Accept，Accept-Language，Content-Language，Content-Type（只限application/x-www-form-urlencoded,multipart/form-data,text/plain）
   
   针对简单请求浏览器会直接发出请求，并在header中添加origin来描述请求来自哪个源

   CORS请求设置的响应头字段都是Access-Control-开头：

   1. Access-Control-Allow-Origin: 必选 接受域名origin字段的值或者为*接受所有请求。
   2. Access-Control-Allow-Credentials: 可选 表示请求中是否允许携带Cookie
   3. Access-Control-Expose-Headers: 可选 代表XMLHttpRequest对象的getResponseHeader()方法能拿到什么字段，默认只能拿到Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma这六个字段。
   
    **非简单请求**

    在正式通信前会发送预检请求，请求方法为Options，请求头包含Access-Control-Request-Method（必选）和Access-Control-Request-Headers（可选），分别表示接下来会用到哪些方法和指定的CORS请求会额外发送的头信息字段。

    响应头字段中：
    
    1. Access-Control-Allow-Methods 必选 表明支持的方法
    2. Access-Control-Allow-Headers 看请求有没有Request-Headers如有则必选 表明服务器支持的所有头信息字段
    3. Access-Control-Allow-Credentials 可选
    4. Access-Control-Max-Age 可选 预检请求有效期

3. nginx代理跨域
   
   将nginx代理服务器的server_name取为和客户端域名一致，然后通过代理的方式转发给服务端。这样客户端访问nginx代理服务器属于同源，而服务器之间的请求不会触发浏览器的同源策略。

4. nodejs中间件实现跨域

    原理与nginx相似，可以是代理，也可以是通过cookieDomainRewrite设置响应头中cookie的域名。
5. document.domain + iframe
    
    仅限主域相同，通过js强制设置document.domain为基础主域。
6. location.hash + iframe
7. window.name + iframe
8. postMessage
9. websocket
    
    浏览器与服务器之间的全双工通信

## document.write和innerHTML

前者重绘所有，后者一部分

## .call()和.apply()

call接收多个参数，apply接收参数数组

## 内存泄漏
setTimeout第一个参数是字符串、闭包、控制台日志、循环（两个对象相互依赖）

## 作用域与变量提升

var全局易污染，let和const块级作用域，

var声明的变量会提升至作用域顶部，但是不会提升至外部

## javascript对象创建方式

1. 工厂模式
2. 构造函数模式
3. 原型模式
4. 混合构造函数和原型模式
5. 动态原型模式
6. 寄生构造函数模式
7. 稳妥构造函数模式

## js继承的6中方法

1. 原型链继承
2. 借用构造函数继承
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生组合式继承

## Ajax过程

1. 创建XMLHttpRequest对象，也就是异步调用对象
2. 创建一个新的HTTP请求，并指定方法URL和验证信息
3. 设置响应HTTP请求状态变化的函数
4. 发送HTTP请求
5. 获取异步调用返回的数据
6. 使用javascript实现局部刷新

## sql注入

将sql语句注入到web表单中提交

## xss

在web页面当中插入恶意html标签和javascript代码

## 为什么会有同源限制

比如银行登录界面使用iframe嵌在页面上，用户登录就可以用js获取其账号

## 获取UA

document.Browser

## HTTP状态码

* 100 Continue 接收Header后返回信息确认
* 200 OK
* 201 Created 创建了新的资源
* 202 Accepted 接受请求尚未处理
* 301 Moved Permanently 网页移动到了新位置
* 302 Found 临时性重定向
* 303 See Other 临时性重定向
* 304 Not Modified 请求网页未修改
* 400 Bad Request 无法理解请求格式
* 401 Unauthorized 未授权
* 403 Forbidden 禁止访问
* 404 Not Found 找不到匹配资源
* 500 Internal Server Error 服务器端错误
* 503 Service Unavailable 服务器无法处理请求

## TCP三次握手

**0. 初始状态**

服务端监听端口，`监听`状态

**1. 客户端发送TCP连接请求**

客户端会随机一个初始序列号seq = x

设置SYN = 1，表示这是SYN握手报文。然后发送给服务端，此时客户端是`同步已发送`状态

**2. 服务端发送针对TCP连接请求的确认**

服务端收到客户端的SYN报文后，随机一个seq = y，设置ack = x + 1，表示收到了客户端的x之前的数据，希望客户端下次发送的数据从x + 1开始，设置SYN = 1和ACK = 1，表示SYN握手和ACK确认应答报文。然后发给客户端。此时服务端是`同步已接收`状态

**3. 客户端发送确认的确认**

客户端收到服务端报文后，向服务端回应报文，置ACK为1，表示应答报文，ack = y + 1，表示收到了服务端的报文，希望服务端从y + 1开始。然后发送，**这次报文可以携带数据**。此时客户端是`连接已建立`状态，服务端接收报文后也是。

**补充**

* 如果出现意外情况，将发送RST报文中止连接

* 三次握手可以阻止历史重复连接、同步双方的初始序列号、避免重复建立连接

## 垃圾回收方法

1. 标记清除
    垃圾回收器会给内存内的所有变量上标记，去掉环境中的变量以及被环境中变量引用的变量（闭包），剩下仍然存在标记的变量就会被回收
2. 引入计数
    计算变量被使用的次数，当次数为0时回收

## Etag
Web服务器分配给在URL中找到特定版本资源的不透明标识符

发送请求时，浏览器会先进行缓存过期判断，如果没过期就不发送请求直接使用缓存

如果过期了，请求中就会携带Etag和文件修改时间

## HTTP2
1. 引入了“服务端推（serverpush）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能
2. 提供更多的加密支持
3. 使用多路技术，允许多个消息在一个连接上同时交差
4. 增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的header都只会占用很小比例的带宽

## axios如何取消请求

1. AbortController
```js
// 创建一个AbortController的实例
const controller = new AbortController();
axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

2. CancelToken

从v0.22.0起被弃用

```js
// 使用CancelToken.source方法创建一个cancel token
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

## MVVM

Model-View-ViewModel

**模型层：** 处理业务逻辑 和服务端交互

**视图层：** 将数据模型转化为UI

**视图模型层：** 通过双向数据绑定连接模型层和视图层

Vue并没有完全遵循MVVM，但设计上受其启发，更偏向于视图层框架

## 响应式

reactive返回一个响应式对象的代理

在get的时候执行track收集依赖，返回时使用Reflect获取对象的属性保证this指针正确指向

在set的时候执行trigger执行依赖函数，同样使用Reflect

采用三层结构存储依赖Weakmap(Target: Reactive Object, Map(prop, dep = Set(effect)))

ref的原理是Object Accessor(对象访问器)，get和set和reactive几乎相同

## vue检测数组变化

vue3的Proxy可以直接监听数组的变化

## vue模板编译原理（待学习后补充更正）

**原理：** compiler模块将模板字符串转化为AST（抽象语法树），调用render函数将AST转换为虚拟dom。页面需要更新时，创建新的虚拟dom，使用diff算法比对，将差异用patch算法渲染到页面。

**虚拟dom：** 虚拟dom本质上是一个js对象，每一个组件对应一个render函数对应一个虚拟dom树。

**为什么需要虚拟dom：** 操作真实dom是很昂贵的，为了性能优化需要虚拟dom。nodejs是没有dom的，实现ssr（服务端渲染）需要虚拟dom。

## Diff算法（学习后补充）

**目标：** 

* 寻找需要更新的节点
* 节点内容不变但顺序改变则调整真实dom的顺序
* 内容改变则进行挂载和dom的调整
* 旧节点移除后卸载节点


****

## js数据类型

* 基本数据类型：Number、String、Boolean、Null、Undefined、Symbol、BigInt
* 引用数据类型：Object、Array、Date、Function、RegExp

基本存储在栈中，引用存储在堆中，栈中保存数据的引用地址

栈内存是自动分配的，堆是动态分配的，不会自动释放

## js变量和函数声明提升

* 函数的提升高于变量
* 函数内部使用var声明和外部名称相同的变量，函数就不再向上寻找
* 匿名函数不提升

## 为什么0.1 + 0.2 > 0.3

js中变量以二进制表示，第1位符号，后11位指数位，最后52位尾数位

0.1和0.2表示后是无限循环小数，截取后大于原值

**解决方案：** (0.1 * 1000 + 0.2 * 1000) / 1000 === 0.3

## 数据类型判断

1. typeof

    无法分辨null和object

    typeof返回的是string类型并且是小写

2. instanceof

    只能判断对象是否存在于目标的原型链上

3. constructor
4. Object.prototype.toString.call()
    比较好的类型判断方法，但是不能判断具体是谁的实例

## instanceof实现原理

```js
function myInstanceof(left, right) {
  let rightP = right.prototype
  let leftP = left.__proto__
  while (true) {
    if (leftP == null) {
      return false
    }
    if (leftP == rightP) {
      return true
    }
    leftP = leftP.__proto__
  }
}
```

## 为什么typeof null是Object

Object二进制表示为000而null全0

## ===涉及到的类型转换

```js
null == Undefined // true
string == Number // string -> Number
Boolean == Number // Boolean -> Number
Object == string Number Symbol // -> Object
```

## NaN === NaN 返回false

用isNaN判断

isNaN传入其他数据类型则先通过Number()转换

## 手写call

```js
Function.prototype._call = function (obj, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  // obj = obj || window
  obj = obj || globalThis
  obj.fn = this
  const result = obj.fn(args)
  delete obj.fn
  return result
}
```

## 手写apply

```js
Function.prototype._apply = function (obj, args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  // obj = obj || window
  obj = obj || globalThis
  obj.fn = this
  const result = obj.fn(...args)
  delete obj.fn
  return result
}
```


## 手写bind

```js
Function.prototype._bind = function (that) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  const _this = this
  const args = Array.prototype.slice.call(arguments, 1)
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    } else {
      return _this.apply(that, args.concat(...arguments))
    }
  }
}
```

## 手写new

```js
function _new(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

## 作用域

变量和函数的可用范围称作作用域

## 作用域链

每个函数都有一个作用域链，查找变量或者函数的时候从局部作用域到全局作用域依次查找，这些作用域的集合叫做作用域链

## 执行上下文

* 全局执行上下文
    
    创建一个全局window对象，并规定this指向window，执行js就压入栈底，关闭浏览器弹出

* 函数执行上下文

    每次函数调用时，会创建一个新的函数执行上下文

    执行上下文分为创建阶段和执行阶段

    * 创建阶段函数环境会创建变量对象：arguments、函数声明、变量声明、函数表达式声明，确定this指向，确定作用域

    * 执行阶段变量赋值、函数表达式赋值，变量对象变成活跃对象

* eval执行上下文

## 执行栈

先进后出

进入执行环境，会创建执行上下文，然后压栈，执行完成时，执行上下文被销毁，进行弹栈

栈底永远是全局环境的执行上下文，栈顶永远是正在执行函数的执行上下文

## 闭包

**定义：** 函数执行形成私有执行上下文，使得内部私有变量不受外界干扰，起到保护和保存的作用

**作用:** 

* 保护：避免命名冲突 
* 保存：解决循环绑定引发的索引问题
* 变量不会销毁：使用函数内部的变量不被垃圾回收机制回收

**应用：**

* 设计模式中的单例模式
* for循环中的保留i的操作
* 防抖和节流
* 函数柯里化

**缺点：** 内存泄漏

## 原型

分为隐式原型(\_\_proto__)和显式原型(prototype)，每个对象都有隐式原型，指向构造函数的显式原型，每个构造方法都有一个显式原型。

所有的prototype都是对象，它的__proto__指向的是Object()的prototype

所有构造函数隐式原型指向的都是Function()的显式原型

Object的隐式原型是null

## 原型链终点

多个\_\_proto__组成的集合称为原型链

instanceof就是判断某对象是否位于某构造方法的原型链上

## 继承方式

**原型继承：** 父类实例作为子类的原型，缺点是子类实例共享了父类构造函数的引用属性

**组合继承：** 子函数中运行父函数并改变this指向，再在子函数的prototype里面new Father() ,使Father的原型中的方法也得到继承，最后改变Son的原型中的constructor，
缺点是调用了两次父类的构造函数，优点是可以传参，不共享引用属性

**寄生组合继承：** 

```js
function Father(name) {
  this.name = name
  this.hobby = ['篮球','足球','乒乓球']
}

Father.prototype.getName = function() {
  console.log(this.name)
}

function Son(name, age) {
  Father.call(this, name)
  this.age = age
}

Son.prototype = Object.create(Father.prototype)
Son.prototype.constructor = Son
```

**extend：** 寄生组合继承的语法糖，可以不写constructor，写了要用super继承

## eventloop

宏任务 -> process.nextTick -> 微任务 -> Dom操作 -> 宏任务

## Promise的原理

new Promise的时候，会传入一个执行函数往往是一些异步操作。Promise构造函数会进行初始化，首先是state，然后是成功返回值value和失败返回值error，接着是成功的函数队列，以及失败的函数队列，分别对应着then里边传入的两个函数，onresolved和onrejected。再者是两个函数，用来处理成功情况和失败情况，resolve和reject，在构造的时候去try执行执行函数并传入resolve和reject，如果成功，resolve函数会执行，那么状态会变成fulfilled，onresolved这个队列里的函数会依次执行；如果失败，reject函数就会执行，状态变成rejected，执行并清空失败回调函数队列。


## html语义化的意义

1. 页面清晰结构
2. 有利于SEO、爬虫
3. 方便设备解析（盲人阅读器）
4. 代码可读性


## Html5新特性

1. Drag and Drop API
2. 语义化标签           header,nav,footer,hgroup,section,article,aside,figure,time,address
3. audio video
4. canvas
5. geolocation
6. webstorage
7. 表单控件             calender date time email url search
8. webworker websocket
9. 移除纯表现元素       basefont big center font s strike tt u
10. 移除负面影响元素    frame frameset noframes