# Promise术语

1. 创建 promise 时，它既不是成功也不是失败状态。这个状态叫作pending（待定）。
2. 当 promise 返回时，称为 resolved（已解决）.
3. 一个成功resolved的 promise 称为fullfilled（实现）。它返回一个值，可以通过将.then()块链接到 promise 链的末尾来访问该值。 .then()块中的执行程序函数将包含 promise 的返回值。
4. 一个不成功resolved的 promise 被称为rejected（拒绝）了。它返回一个原因（reason），一条错误消息，说明为什么拒绝 promise。可以通过将.catch()块链接到 promise 链的末尾来访问此原因。
   
当我们不知道函数的返回值或返回需要多长时间时，Promises 是构建异步应用程序的好方法。它们使得在没有深度嵌套回调的情况下更容易表达和推理异步操作序列，并且它们支持类似于同步try...catch语句的错误处理方式。