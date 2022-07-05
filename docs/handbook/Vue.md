# Vue散记

## 阻止冒泡
```html
<button @click.stop="clickTap">123</button>
```

## 阻止默认提交行为
```html
<form action="/">
  <button @click.prevent="clickTap" type="submit">123</button>
</form>
```

## ref配合ts使用
```ts
import { ref, Ref } from "vue"
let message: Ref<string> = ref('波宁')
changeMsg = () => {
  message.value = '宁波'
  console.log(message)
}
```

## shallowRef的使用
```ts
import { shallowRef, triggerRef } from 'vue'
let message = shallowRef({
  name: 'tian'
})

const changeMsg = () => {
  message.value = { name: 'qiu' }
  // 更改message.value.name无响应式
}

const changeMsgForce = () => {
  message.value.name = 'qiu'
  triggerRef(message)
}
```
这种响应式用于提升性能

## setup语法糖中使用defineProps
```ts
type Props = {
  title: string,
  data: number[]
}
defineProps<Props>()
```
当然也可以将属性设置为可选的，并且给予初始值
```ts
type Props = {
  title?: string,
  data?: number[]
}
withDefaults(defineProps<Props>(),{
  title: "默认值",
  data: () => [1,2,3]
})
```
注意这里复杂的数据类型需要函数将所需要赋的值`return`出来
## setup语法糖中使用defineEmits
```ts
const emit = defineEmits(['on-click'])
const clickTap = () => {
  emit('on-click',list)
}
```
父组件中
```html
<template>
<Menu @on-click="functionName">
</template>
<script setup lang="ts">
const functionName = (list: number[]) => {
  console.log(list)
}
</script>
```
## defineExpose的使用
```ts
defineExpose({
  list,
  flag
})
```
这么做父组件就可以通过实例去访问子组件中暴露的内容，更加安全。

## 先判断对象存在再读取属性防止报错的替代方案
```ts
console.log(list) // undefined
console.log(list.length) // error
console.log(list && list.length) // undefined
console.log(list?.length) // undefined
```
### 拓展
当前边的表达式使用了`?`后可以使用`??`来返回当前者表达式为`undefined`或者`null`时一个指定的值。
```ts
console.log(list?.length ?? []) // []
```
## TypeScript中Pick的使用
```ts
type Tabs = {
  name: string,
  comName: any
}
type Com = Pick<Tabs, 'comName'>
```
## markRaw跳过代理
```ts
const data = reactive<Tabs[]>([
  {
    name: '组件A',
    comName: markRaw(A)
  },
  {
    name: '组件B',
    comName: markRaw(B)
  },
  {
    name: '组件C',
    comName: markRaw(C)
  }
])
```
注册的组件本身会拥有代理，reactive也会添加一层代理，这是多余的。
## 动态插槽
```html
<Dialog>
  <template #[name]>
    <div>
      something
    </div>
  </template>
</Dialog>
```
```ts
let name = ref('header')
```
## 关于白屏
朋友面试的时候面试官问白屏怎么解决，在三个月的答案求索过程中，终于知道原来问的是异步问题，不是怎么处理bug。

## 异步组件
利用`defineAsyncComponent`来引入一个异步组件
```ts
const A = defineAsyncComponent(() => import('./boning.vue'))
```
需要配合\<Suspense\>组件使用。
```html
<Suspense>
  <template  #default>
    <A></A>
  </template>
  <template #fallback>
    <div>loading...</div>
  </template>
</Suspense>
```

## `new Array(n).fill(0)`初始化数组的替代方案
```ts
Array.apply(null,{length: 81} as number[])
```
## 数字过渡效果
```ts
const num = reactive({
  current: 0,
  tweenedNumber: 0
})
watch(()=> num.current,(newVal,oldVal) => {
  gasp.to(num,{
    duration: 1,
    tweenedNumber: newVal
  })
})
```
```html
<input v-model="num.current" step="20" type="number">
{{ num.tweenedNumber.toFixed(0) }}
```

## 手撸实现eventBus
```ts
type BusClass = {
  emit: (name: string) => void
  on:(name: string,callBack: Function) => void
}
type Pramskey = string | number | symbol
type List = {
  [key: Pramskey]: Array<Function>
}
class Bus implements BusClass {
  list: List
  constructor() {
    this.list = {}
  }
  emit(name: string, ...args:Array<any>) {
    let eventName: Array<Function> = this.list[name]
    eventName.forEach(fn => {
      fn.apply(this, args)
    })
  }
  on(name: string, callBack: Function) {
    let fn:Array<Function> = this.list[name] || []
    fn.push(callBack)
    this.list[name] = fn
  }
}

export default new Bus()
```

## mitt的使用
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const Mit = mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

const app = createApp(App)

//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

app.mount('#app')
```

```ts
// A组件派发
<template>
    <div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>

<style>
</style>
```

```ts
// B组件监听
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>

<style>
</style>
```

```ts
// 监听所有事件
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})
```

```ts
// 移除监听事件
const Fn = (num: any) => {
    console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

```ts
// 清空所有监听
instance?.proxy?.$Bus.all.clear()
```

## 样式穿透
```css
:deep(.el-input__inner) {
  background: red;
}
```

## 插槽选择器
```css
:slotted(.a){
  color: red
}
```

## 全局选择器
```css
:global(div) {
  background-color: pink;
}
```

## 动态css
```html
<template>
  <div class="div">
    动态css
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// const style = ref('pink')
const style = ref({
  color: 'red'
})
</script>
<style scoped>
/* .div {
  color: v-bind(style);
} */
.div {
  color: v-bind('style.color');
}
</style>
```

## Router传参
### 利用query
传出，此时参数会显示在url上
```ts
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({
  path: '/login',
  query: {
    something
  }
})
```
传入，注意导入的模块不同
```ts
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.something)
```
### 利用params传参
传出，不会显示在url中
```ts
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({
  name: 'Login', // 必须使用name
  params: {
    something
  }
})
```
传入，params存储在内存当中，刷新会消失
```ts
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.something)
```

## router定位先前滚动距离
```ts
const router = createRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top:0
      }
    }
    // 延迟
    // return new Promise((r)=> {
    //   setTimeout(() => {
    //     r({
    //       top:15
    //     })
    //   }，2000)
    // })
  }
})
```