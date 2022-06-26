# 新蜂电商前端vue源码研读（中篇）

## 插槽传递父组件作用域的data
```html
<!-- 父组件 -->
<ul>
  <li v-for="( item, index ) in items">
    <slot :item="item" :index="index" :another-attribute="anotherAttribute"></slot>
  </li>
</ul>

<!-- 子组件 -->
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```
注：v-slot必须与template进行绑定，唯一例外情况是被提供的内容只有默认插槽时，，组件的标签才可以被当作插槽的模板来使用。
## 移动端的滚动回弹效果控制
```css
.router-view {
      -webkit-overflow-scrolling: touch;
}
```
## \<router-view\>的v-slot
\<router-view\> 暴露了一个 v-slot API，主要使用 \<transition\> 和 \<keep-alive\> 组件来包裹你的路由组件。
```html
<router-view class="router-view" v-slot="{ Component }">
  <transition :name="transitionName">
    <component :is="Component" />
  </transition>
</router-view>
```
## <transition\>过渡动画控制
在NewBee电商源码中是在App跟组件中如下定义：
```js
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left'
    })
    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left' // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''   // 同级无过渡效果
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
```
```to.index.meta```是定义在router.js中的，用于判别各组件之间的优先级。

此外，我还发现最近学习的优秀项目中的路由设置都是以这样的方式导入组件的。
```js
{
  path: '/home',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  meta: {
    index: 1
  }
}
```