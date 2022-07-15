# Promise术语以及异步编程注意点

## 术语

1. 创建 promise 时，它既不是成功也不是失败状态。这个状态叫作pending（待定）。
2. 当 promise 返回时，称为 resolved（已解决）.
3. 一个成功resolved的 promise 称为fullfilled（实现）。它返回一个值，可以通过将.then()块链接到 promise 链的末尾来访问该值。 .then()块中的执行程序函数将包含 promise 的返回值。
4. 一个不成功resolved的 promise 被称为rejected（拒绝）了。它返回一个原因（reason），一条错误消息，说明为什么拒绝 promise。可以通过将.catch()块链接到 promise 链的末尾来访问此原因。
   
当我们不知道函数的返回值或返回需要多长时间时，Promises 是构建异步应用程序的好方法。它们使得在没有深度嵌套回调的情况下更容易表达和推理异步操作序列，并且它们支持类似于同步try...catch语句的错误处理方式。

## 注意点
1. 以下代码会先执行第一个fetch后再执行第二个，效率较低。
```javascript
async function f() {
  const a = await fetch(url1)
  const b = await fetch(url2)
  // ...
}
```
更高效的做法是将所有Promise用Promise.all组合起来
```javascript
async function f() {
  const promiseA = fetch(url1)
  const promiseB = fetch(url2)
  const [a, b] = await Promise.all([promiseA, promiseB])
  // ...
}
```

2. 以下代码中的foreach会立刻返回，并不会等到所有异步操作执行完毕。同理，map也是一样的情况。
```javascript
async function f() {
  [1, 2, 3].forEach(async (i) => {
    await someAsyncOperation()
  })
  console.log('done')
}

f()
```
此时就应该选择传统的for循环方法。更高级的写法是在for里加入await语法糖。
```javascript
async function f() {
  const promises = [
    someAsyncOperation(),
    someAsyncOperation(),
    someAsyncOperation()
  ]
  for await (let result of promises) {
    console.log('done')
  }
}

f()
```