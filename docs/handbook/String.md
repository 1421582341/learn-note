# substr,substring和slice三者的比较

当substring和slice传入的参数均为正值时，两者效果基本相同，都是从起始位置截取至结束位置。而substr则是从起始位置截取指定长度的字符串。

```javascript
const str = 'Hello World'

console.log(str.slice(4,7))       //o W
console.log(str.substring(4,7))   //o W
console.log(str.substr(4,7))      //o World
```

值得注意的是如果substring传入的参数如果后者比前者小，那么substring会以后者作为起始位置，而slice则是无法得到结果。

```javascript
console.log(str.slice(7,4))       //无输出
console.log(str.substring(7,4))   //o W
```

传入负值时，slice和substr会将该参数与字符串长度相加得到的结果作为参数，而substring则是直接当0处理

```javascript
console.log(test.slice(-3))         //rld
console.log(test.substring(-3))     //hello world
console.log(test.substr(-3))        //rld

console.log(test.slice(3,-4))       //lo w
console.log(test.substring(3,-4))   //hel
console.log(test.substr(3,-4))      //空字符串
```