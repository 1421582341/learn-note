# 带动画效果的链接

在labulangdong刷题小抄的时候看到了这么一个带动画的链接

图片后边再补

感觉相当好看

所以我决定先把他偷下来

```css
#body a.highlight:after{
  display: block;
  content: "";
  height: 1px;
  width: 0%;
  -webkit-transition: width 0.5s ease;
  -moz-transition: width 0.5s ease;
  -ms-transition: width 0.5s ease;
  transition: width 0.5s ease;
  background-color: var(--MAIN-LINK-HOVER-color);
}
```