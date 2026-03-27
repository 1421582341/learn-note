---
title: "发光字体"
description: "学习笔记: 发光字体"
pubDate: "2026-03-27"
---


```less
.titleText {
  position: relative;
  font-family: 'Source Han Serif CN', sans-serif;
  font-size: 19px;
  font-style: normal;
  font-weight: 900;
  line-height: 42px;
  text-align: center;
  text-shadow:
    -1.3px -1.3px 4.3px rgb(184 120 27 / 50%),
    0 1.3px 4.3px rgb(184 120 27 / 50%);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #fae8b6 51.8%, #ffedd8 80.76%);
    background-clip: text;
    content: attr(data-text);
    font: inherit;
    pointer-events: none;
    text-align: center;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
  }
}
```

```tsx
<div class={styles.number} data-text={stage3Info?.bounty / 100}>
  {stage3Info?.bounty / 100}
</div>
```