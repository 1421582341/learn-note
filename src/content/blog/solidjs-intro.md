---
title: "重新认识 SolidJS：极致性能背后的预编译与细粒度响应式"
description: "基于 SolidJS 官方文档深度解析：为什么它不需要虚拟 DOM？组件只运行一次是怎么回事？如何正确理解 Props 代理？"
pubDate: "2026-03-30"
---

如果你带着 React 的思维去写 SolidJS，你可能会感到困惑。SolidJS 虽然拥有极其相似的 JSX 语法，但其底层逻辑完全不同。根据 [SolidJS 官方文档](https://docs.solidjs.com/)，它是一个**预编译**的、**细粒度响应式**的 UI 库。

---

## 1. 核心哲学：组件只运行一次

这是 SolidJS 与 React 最本质的区别。

-   **React**：组件是一个“渲染函数”，每当状态改变，整个函数都会重新执行。
-   **SolidJS**：组件是一个“初始化函数”。它**只在挂载时运行一次**。
    -   你在组件顶层写的 `console.log` 只会打印一次。
    -   组件的作用是建立一个**响应式图谱 (Reactive Graph)**，然后功成身退。

---

## 2. 细粒度响应式 (Fine-Grained Reactivity)

SolidJS 的响应式基于三个原语：**Signals**, **Effects**, 和 **Memos**。

### 2.1 Signals：数据的源头
Signal 是包含值及其更新函数的元组。最关键的是，Signal 的返回值是一个 **Getter 函数**。

```javascript
const [count, setCount] = createSignal(0);
// 获取值必须调用函数：count()
```
为什么要调用函数？因为只有在执行函数时，SolidJS 才能在当前的执行上下文中捕捉到谁在使用这个数据，从而建立订阅关系。

### 2.2 Effects 与 Memos
-   **Effects**：观察 Signal 的变化并执行副作用（如 DOM 操作、日志）。
-   **Memos**：缓存派生值。只有当依赖项改变时，它才会重新计算，并通知自己的订阅者。

---

## 3. 预编译：从 JSX 到原生 DOM

SolidJS 不使用虚拟 DOM (No VDOM)。它通过编译器将 JSX 转换成极其高效的原生 JavaScript 代码。

当你写下：
```jsx
<div>{count()}</div>
```
编译器会将其转化为类似：
```javascript
const div = document.createElement("div");
createRenderEffect(() => div.textContent = count());
```
它直接将状态与 DOM 节点的特定属性绑定。当 `count` 改变时，**只有那一行 `div.textContent = ...` 会运行**。

---

## 4. 深度进阶：源码里的响应式图谱

通过分析 SolidJS 核心源码（`solid.js`），我们可以看到极致性能背后的精密设计：

### 4.1 任务调度与并发 (The Scheduler)
源码中实现了一个基于 `MessageChannel` 的轻量级调度器。
-   **时间分片**：它利用 `postMessage` 在宏任务间隙执行任务，并使用 `performance.now()` 监控执行时长（`yieldInterval` 默认为 5ms）。如果执行超过限额且有输入挂起（`isInputPending`），它会主动出让（Yield）主线程。
-   **任务队列**：通过 `expirationTime` 管理 `taskQueue`，确保任务能按优先级顺序执行。

### 4.2 状态标记：STALE 与 PENDING
为了解决复杂的响应式依赖更新，SolidJS 使用了“推拉结合”的策略。源码中通过 `state` 标记位（`STALE=1`, `PENDING=2`）来协调更新：
1.  **Downstream Marking**：当 Signal 更新时，它会递归地将其所有观察者标记为 `STALE`。
2.  **Upstream Looking**：当读取一个计算属性时，如果其状态为 `STALE`，它会向上检查（`lookUpstream`）源头是否真的发生了改变，从而避免由于多个路径导致的多余计算。

### 4.3 所有权系统 (Ownership System)
为什么 SolidJS 几乎没有内存泄漏？因为它基于 `Owner` 链建立了严格的生命周期。
-   **`createRoot`**：它是所有响应式节点的起点，负责持有 `owned` 列表。
-   **自动清理**：每当一个 `Computation` (Effect/Memo) 重新运行或被销毁时，源码中的 `cleanNode` 函数会递归清理其下的所有子节点并触发 `cleanups` 列表。这种“所有权”机制完美弥补了没有虚拟 DOM 生命周期的缺陷。

---

## 5. Props 与解构陷阱

在 SolidJS 中，`props` 是一个**响应式代理 (Proxy)**。

**绝对不要解构 Props！**
```javascript
// ❌ 错误示范：解构会丢失响应式
function MyComponent({ name }) {
  return <div>{name}</div>;
}

// ✅ 正确做法：直接使用 props.xxx
function MyComponent(props) {
  return <div>{props.name}</div>;
}
```
因为 `props` 实际上是在追踪对属性的访问。如果你解构了它，你就相当于在组件运行的那一瞬间（仅一次）拿到了它的值，之后它的变化将无法被追踪。

---

## 6. 内置控制流 (Control Flow)

由于组件函数不重复运行，你不能在 JSX 中直接使用 `.map()` 或 `if/else` 来处理动态列表或条件渲染（因为它们只会在初始化时运行一次）。

SolidJS 提供了专门组件：
-   **`<Show>`**：替代三元运算符。
-   **`<For>`**：替代 `.map()`。它经过深度优化（源码中的 `mapArray` 算法），在列表更新时只移动或更新必要的 DOM 节点。
-   **`<Index>`**：当处理原始类型列表或需要通过索引追踪时使用（对应源码中的 `indexArray`）。

---

## 总结：为什么 SolidJS 这么快？

1.  **无 VDOM 开销**：没有内存中的树对比（Diffing）。
2.  **细粒度更新**：状态变化直接推送到具体的 DOM 更新。
3.  **组件闭包优化**：组件不重运行，避免了大量的闭包创建和垃圾回收压力。

SolidJS 证明了：**声明式的开发体验并不一定需要以牺牲性能为代价。**
