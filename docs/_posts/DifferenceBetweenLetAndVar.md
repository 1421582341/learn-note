# var和let之间的区别

var没有块级作用域，它的作用域是包含该申明变量的函数。
```javascript
for (var i = 0; i < 10; i++) {
  count++
}
console.log(i) // output: 10
```
上述代码的变量i在结束循环后仍能被访问到，而let拥有块级作用域，即包含该变量的{}
```javascript
for (let i = 0; i < 10; i++) {
  count++
}
console.log(i) // output: undefind
```
var申明的变量还会在循环中被过度共享
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i) // output: 3 3 3
  }, 1000)
}
```
此外，let声明的全局变量不是全局对象的属性。这就意味着，你不可以通过window.变量名的方式访问这些变量。它们只存在于一个不可见的块的作用域中，这个块理论上是Web页面中运行的所有JS代码的外层块。

ES6还引入了const用于定义常量，我个人相当喜欢在申明数组时使用它，以保证申明变量后该变量不会指向别的地址。

顺带一提，const也拥有块级作用域。这代表如下使用const的语法是可以的。
```javascript
for (let i = 0; i < 3; i++) {
  const a = i
  console.log(a) // output: 1 2 3
}
```
