# vue3 vue2 差异

避开八股不谈，聊聊生产中遇到的差异

## 关于children顺序的问题

vue2 children是无序的，但是如果是通过this.$slots.default去取子节点的vnode信息，获得到的数组是有序的
vue3 取消了children的概念并推荐使用模版引用ref，但是仍可以通过vm.subtree取到children信息，并且是依照模版有序的

## 生命周期函数

vue2 不允许多个mounted定义
vue3 允许多个onMounted定义，并且会顺序执行

# 组件逻辑复用

vue2主要是依靠mixins和extends
vue3复用组件逻辑使用composable函数