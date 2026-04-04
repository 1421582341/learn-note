---
title: "数学与代码：深入解析求平方根的多种算法"
description: "从二分查找法到高效的牛顿迭代法，探索如何在计算机中实现平方根计算，并提供 JavaScript 实现示例。"
pubDate: "2026-03-31"
---

在编程中，我们通常直接调用 `Math.sqrt()` 来获取一个数的平方根。但你是否思考过，计算机底层是如何在没有硬件开方指令的情况下，通过简单的加减乘除计算出高精度的平方根的？

本文将介绍两种主流的平方根算法：**二分查找法**和**牛顿迭代法**。

---

## 1. 二分查找法 (Binary Search)

二分查找是最直观的算法。如果我们要求 $n$ 的平方根 $x$（即 $x^2 = n$），我们知道 $x$ 一定落在 $[0, n]$ 之间。

### 算法思路：
1.  设定左边界 `low = 0`，右边界 `high = n`。
2.  取中间值 `mid = (low + high) / 2`。
3.  计算 `mid * mid`：
    -   如果 `mid * mid` 接近 $n$，则返回 `mid`。
    -   如果 `mid * mid > n`，说明根在左半部分，设置 `high = mid`。
    -   如果 `mid * mid < n`，说明根在右半部分，设置 `low = mid`。
4.  重复上述过程，直到达到所需的精度。

### JavaScript 实现：
```javascript
/**
 * 二分查找法求平方根
 * @param {number} n - 目标数
 * @param {number} precision - 精度要求（如 0.00001）
 */
function sqrtBinary(n, precision = 0.000001) {
  if (n < 0) return NaN;
  if (n === 0) return 0;

  let low = 0;
  let high = Math.max(1, n); // 处理 n < 1 的情况
  let mid;

  while (high - low > precision) {
    mid = (low + high) / 2;
    if (mid * mid > n) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return (low + high) / 2;
}

console.log(sqrtBinary(2)); // 1.414213...
```

---

## 2. 牛顿迭代法 (Newton's Method)

牛顿迭代法是数值分析中求方程近似根的最快方法之一。对于求平方根，我们实际上是在求函数 $f(x) = x^2 - n$ 的零点。

### 数学推导：
根据泰勒级数或几何切线法，我们可以得出迭代公式：
$$x_{k+1} = \frac{1}{2} (x_k + \frac{n}{x_k})$$

这个公式的收敛速度非常快，通常只需要几次迭代就能达到极高的精度。

### JavaScript 实现：
```javascript
/**
 * 牛顿迭代法求平方根
 * @param {number} n - 目标数
 */
function sqrtNewton(n) {
  if (n < 0) return NaN;
  if (n === 0) return 0;

  let res = n;
  const precision = 0.000001;

  // 迭代公式：x = (x + n/x) / 2
  while (Math.abs(res * res - n) > precision) {
    res = (res + n / res) / 2;
  }

  return res;
}

console.log(sqrtNewton(10)); // 3.162277...
```

---

## 3. 两种算法的对比

| 特性 | 二分查找法 | 牛顿迭代法 |
| :--- | :--- | :--- |
| **原理** | 区间折半，逐级逼近 | 切线法，极速收敛 |
| **收敛速度** | 线性收敛 (较慢) | 平方收敛 (极快) |
| **复杂度** | $O(\log(n/\text{precision}))$ | 极高，通常 5-10 次迭代即可 |
| **实现难度** | 简单 | 中等（需理解导数/迭代思想） |

---

## 4. 趣闻：雷神之锤 III 的“神迹”

在计算机图形学史上，有一个著名的**快速平方根倒数算法 (Fast Inverse Square Root)**。它出现在《雷神之锤 III》的源码中，用于计算 $1/\sqrt{x}$。

它使用了一个神秘的常数 `0x5f3759df` 和位移操作，速度比当时的硬件浮点运算还要快。虽然它计算的是平方根的倒数，但它展示了程序员为了压榨性能所能达到的极致。

```javascript
// 注意：这只是思想展示，JS 的浮点数处理与 C 语言不同，
// 无法直接通过位移操作实现该算法。
// 那个著名的常数：0x5f3759df
```

---

## 总结

虽然在日常开发中 `Math.sqrt()` 是首选，但理解这些底层算法能帮助我们建立更好的数值计算直觉。**二分法**体现了分治的思想，而**牛顿迭代法**则展示了数学工具在优化程序性能时的巨大威力。

如果你正在处理图形渲染或高性能计算，深入研究这些算法将受益匪浅。
