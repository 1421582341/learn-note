---
title: "项目格式规范实践"
description: "学习笔记: 项目格式规范实践"
pubDate: "2026-03-27"
---


用[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier#configuration-new-eslintconfigjs) + vscode setting + eslint vscode插件的组合实现项目格式规范

## 安装

```bash
pnpm add -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

## eslint配置

```js
// .eslintrc.js
/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended'
  ],
}
```

## vscode工作区设置

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "eslint.validate": ["javascript"],
  "stylelint.validate": ["css", "less"],
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "cSpell.words": [
    "upower"
  ]
}

```