# JavaScript中生成多维数组

在刷股票买卖问题，涉及到了多维数组，所以在这里记录一下js如何生成二维以上的数组

```javascript
let dp = new Array(n).fill(0).map(
  () => new Array(max_k + 1).fill(0).map(
    () => new Array(2).fill(0)));
```

值得注意的是千万不要在括号函数后边加{}，这样会让编译器认为dp[][]第二个索引是属性