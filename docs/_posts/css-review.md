# CSS笔记

## 图片文字对齐方式
图片默认是和文字基线对齐的，可以通过vertical-align属性进行修改
```css
vertical-align: middle
```


## CSS优先级
1. 千位： 如果声明在 style 的属性（内联样式）则该位得一分。这样的声明没有选择器，所以它得分总是1000。

2. 百位： 选择器中包含ID选择器则该位得一分。

3. 十位： 选择器中包含类选择器、属性选择器或者伪类则该位得一分。

4. 个位：选择器中包含元素、伪元素选择器则该位得一分。
  
## 花里胡哨的列表元素Marker
```css
li {
  list-style-type: space-counter;
  list-style-type: "\1F44D"; // thumbs up sign
}
```

## 块级盒子和内联盒子对比
块级盒子：
>1. 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
>   
>2. 每个盒子都会换行
>   
>3. width 和 height 属性可以发挥作用
>   
>4. 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

内联盒子：
>1. 盒子不会产生换行。
>   
>2. width 和 height 属性将不起作用。
>   
>3. 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
>   
>4. 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

## form元素的重置
```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  padding: 0; margin: 0;
}

textarea {
  overflow: auto;
} 
```

<!-- ## 让图片不再溢出

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
``` -->

## 元素通过绝对定位整体居中

```css
h1 {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
```
## body元素自带外边距
```css
body {
  margin: 0;
}
```
