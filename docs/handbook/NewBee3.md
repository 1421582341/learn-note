# 新蜂电商前端vue源码研读（后篇）

## toRefs
将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。
```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```
当从组合式函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：
```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```
newbee源码中的```setup()```函数中返回值是这样写的：
```js
return {
  ...toRefs(state)
}
```
在保留了响应性的情况下对state进行了解构。
## will-change属性
CSS 属性 will-change 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。
```css
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
    height: 100%;
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    backface-visibility: hidden;
}
```
根据MDN上的描述，这个属性是用于页面优化的，可能与浏览器本身进行的优化相冲突，浪费更多的资源，所以应该秉承着有节制并且不到最后优化阶段不使用的原则进行使用。
## <noscript\>的使用
如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 HTML <noscript\> 元素中定义脚本未被执行时的替代内容。
```html
<noscript>
  <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
```
## 摒弃使用<a\>标签
newbee项目中没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。
## 移动端点击高亮
```css
html,body{
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```
## 底部导航栏购物车count逻辑
```js
onMounted(() => {
  const token = getLocal('token')
  const path = route.path
  // console.log(path)
  if (token && !['/home', '/category'].includes(path)) {
    store.dispatch('updateCart')
  }
})
```
在Home页面和Category页面导航栏是常驻并且不会更新的，用户在这两个页面也不会对购物车内容进行更新，所有有了if判断中的条件语句。整体上实现的功能就是每当底部导航栏被唤出的时候都会更新一次购物车内的数量，并且在接下来的计算属性中获取。
## 解决在开发阶段和部署阶段中axios的基本请求地址不同的问题
```js
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//localhost:8080/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
```
原作者在上线前已经统一改成了后端服务器的地址。
## 请求头中携带token
```js
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
```
## 处理登录请求
```js
if (res.data.data && window.location.hash == '#/login') {
  setLocal('token', res.data.data)
  axios.defaults.headers['token'] = res.data.data
}
```
## 顶部搜索栏随滚动的样式变化
```html
<header class="home-header wrap" :class="{ 'active': headerScroll }">
```
```js
const state = reactive({
  headerScroll: fasle
})
nextTick(() => {
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
  })
})
```
