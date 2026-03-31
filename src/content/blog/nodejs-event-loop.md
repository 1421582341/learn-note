---
title: "Node.js 事件循环"
description: "深入理解 Node.js 事件循环的工作原理、各个阶段以及宏任务与微任务的区别"
pubDate: "2026-03-31"
---

Node.js 是基于事件驱动的异步 I/O 运行环境。理解事件循环（Event Loop）是掌握 Node.js 高性能开发的关键。

## 什么是事件循环？

事件循环是 Node.js 处理非阻塞 I/O 操作的机制。尽管 JavaScript 是单线程的，但通过将操作转移到系统内核（如网络请求、文件读取），Node.js 能够实现并发处理。

## 事件循环的六个阶段

当 Node.js 启动时，它会初始化事件循环。事件循环包含以下六个主要阶段，它们会按顺序循环执行：

1.  **timers（定时器）**：执行 `setTimeout()` 和 `setInterval()` 的回调。
2.  **pending callbacks（待定回调）**：执行延迟到下一个循环迭代的 I/O 回调（例如 TCP 错误）。
3.  **idle, prepare**：仅限内部使用。
4.  **poll（轮询）**：检索新的 I/O 事件；执行与 I/O 相关的回调。
5.  **check（检查）**：执行 `setImmediate()` 的回调。
6.  **close callbacks（关闭回调）**：执行关闭事件的回调，如 `socket.on('close', ...)`。

## 宏任务 vs 微任务

在 Node.js 中，除了上述阶段的任务（宏任务），还有微任务（Microtasks）：

-   **process.nextTick()**：优先级最高，在当前操作完成后、事件循环继续之前立即执行。
-   **Promise.then()**：在 `process.nextTick()` 之后、下一个事件循环阶段之前执行。

## 执行顺序示例

让我们通过一段代码来验证执行顺序：

```javascript
const fs = require('fs');

console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (Timer Phase)');
}, 0);

setImmediate(() => {
  console.log('3. setImmediate (Check Phase)');
});

fs.readFile(__filename, () => {
  console.log('4. File Read (Poll Phase)');
  
  setTimeout(() => {
    console.log('5. setTimeout inside I/O');
  }, 0);
  
  setImmediate(() => {
    console.log('6. setImmediate inside I/O');
  });
});

process.nextTick(() => {
  console.log('7. process.nextTick (Microtask)');
});

Promise.resolve().then(() => {
  console.log('8. Promise (Microtask)');
});

console.log('9. End');
```

### 预期输出结果：
1. `1. Start` (同步)
2. `9. End` (同步)
3. `7. process.nextTick` (微任务最高优先级)
4. `8. Promise` (微任务)
5. `2. setTimeout` 或 `3. setImmediate` (取决于系统性能，通常 timer 优先)
6. `4. File Read` (I/O 回调在 Poll 阶段)
7. `6. setImmediate inside I/O` (Poll 阶段后紧跟 Check 阶段)
8. `5. setTimeout inside I/O` (下一轮循环的 Timer 阶段)

## 总结

-   事件循环是 Node.js 异步特性的核心。
-   微任务（`nextTick` 和 `Promise`）会在每个阶段之间“插队”执行。
-   在 I/O 回调中，`setImmediate` 总是比 `setTimeout` 先执行，因为 Poll 阶段后面紧跟着 Check 阶段。
