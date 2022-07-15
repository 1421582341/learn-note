module.exports = {
  title: '生姜烧肉的博客',
  description: '生姜烧肉的博客',
  theme: 'reco',
  base: '/learn-note/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      {
        text: '生姜烧肉',
        items: [{ text: 'Github', link: 'https://github.com/1421582341' }]
      }
    ],
    sidebar: [
      {
        title: '欢迎',
        path: '/',
        collapsable: false
      },
      {
        title: 'Todo List',
        path: '/_posts/todo',
        collapsable: false
      },
      {
        title: 'Markdown学习',
        path: '/_posts/markdown-sample',
        collapsable: false // 不折叠
      },
      {
        title: '优秀项目阅读笔记',
        path: '/_posts/new-bee1',
        collapsable: false,
        children: [
          {
            title: '新蜂项目阅读笔记（前篇）',
            path: '/_posts/new-bee1'
          },
          {
            title: '新蜂项目阅读笔记（中篇）',
            path: '/_posts/new-bee2'
          },
          {
            title: '新蜂项目阅读笔记（后篇）',
            path: '/_posts/new-bee3'
          }
        ]
      },
      {
        title: 'CSS笔记',
        path: '/_posts/css-review',
        collapsable: false,
        children: [
          {
            title: 'CSS复习零碎笔记',
            path: '/_posts/css-review'
          },
          {
            title: '带动画的链接',
            path: '/_posts/link-animation'
          }
        ]
      },
      {
        title: 'JavaScript笔记',
        path: '/_posts/diff-between-var-let',
        collapsable: false,
        children: [
          {
            title: 'let,vat和const三者比较',
            path: '/_posts/diff-between-var-let'
          },
          {
            title: 'substr,substring和slice三者的比较',
            path: '/_posts/compare-between-substr-substring-slice'
          },
          {
            title: '生成多维数组的方法',
            path: '/_posts/multidimensional-array'
          },
          {
            title: 'Promise简记',
            path: '/_posts/promise'
          }
        ]
      },
      {
        title: 'Vue笔记',
        path: '/_posts/vue'
      },
      {
        title: '开发日志',
        path: '/_posts/cloud-music-dev-log'
      },
      {
        title: '面试准备',
        path: '/_posts/interview'
      },
      {
        title: 'Linux笔记',
        path: '/_posts/linux'
      }
    ]
  },
  search: true,
  searchMaxSuggestions: 10,
  lastUpdated: '最后更新于',
  repo: 'https://github.com/1421582341'
}
