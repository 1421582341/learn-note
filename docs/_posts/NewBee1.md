# 新蜂电商前端vue源码研读（前篇）
介于vuepress无法编译内容过长的md文件，所以把这篇笔记分成三个篇章。
## 全局过滤器
```js
// main.js
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}
```
## 组件上使用v-model
```js
// 子组件
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})

// 父组件
<custom-input v-model="searchText"></custom-input>
```
## 动态组件
```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component :is="currentTabComponent"></component>
```
## 动态类名
```html
  <button
     v-for="tab in tabs"
     :key="tab"
     :class="['tab-button', { active: currentTab === tab }]"
     @click="currentTab = tab"
   >
    {{ tab.name }}
  </button>
    <component
     v-bind:is="currentTab.component"
  ></component>
```
```css
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
```
```js
const tabs = [
  {
    name: 'Home',
    component: {
      template: `<div class="demo-tab">Home component</div>`
    }
  },
  {
    name: 'Posts',
    component: {
      template: `<div class="demo-tab">Posts component</div>`
    }
  },
  {
    name: 'Archive',
    component: {
      template: `<div class="demo-tab">Archive component</div>`
    }
  }
]

const state = reactive({
  currentTab: tabs[0]
})
```