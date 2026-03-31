---
title: "前端性能优化"
description: "面试鸭自用题解"
pubDate: "2026-03-31"
---

1. 资源都上传CDN
2. 图片用合适的切图，webp或者jpg压缩体积
3. 字体根据unicode分包
4. 图片和字体懒加载
5. js、css的文件压缩
6. 启用浏览器缓存 cache 和 etag 配合
7. 网页离线缓存 Service Worker
8. 把重复使用的三方库抽出来单独分chunk复用，减少产物体积
9. 非必要js异步加载 async
10. 异步加载路由
11. 减少回流重绘，图片