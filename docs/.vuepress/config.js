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
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认文案 “标签”
      },
      socialLinks: [{ icon: 'reco-github', link: 'https://github.com/1421582341' }]
    },
    nav: [
      { text: '主页', link: '/' },
      {
        text: '生姜烧肉',
        items: [{ text: 'Github', link: 'https://github.com/1421582341' }]
      }
    ],
    sidebar: [
      {
        title: 'Welcome',
        path: '/',
        collapsable: false
      },
      {
        title: 'TODO',
        path: '/_posts/TODO',
        collapsable: false
      },
      {
        title: 'Markdown学习',
        path: '/_posts/Sample',
        collapsable: false // 不折叠
      },
      {
        title: '优秀项目阅读笔记',
        path: '/_posts/NewBee1',
        collapsable: false,
        children: [
          {
            title: '新蜂项目阅读笔记（前篇）',
            path: '/_posts/NewBee1'
          },
          {
            title: '新蜂项目阅读笔记（中篇）',
            path: '/_posts/NewBee2'
          },
          {
            title: '新蜂项目阅读笔记（后篇）',
            path: '/_posts/NewBee3'
          }
        ]
      },
      {
        title: '烧肉のCSS小抄',
        path: '/_posts/LinkAnimation',
        collapsable: false,
        children: [
          {
            title: 'CSS复习零碎笔记',
            path: '/_posts/CSSNote'
          },
          {
            title: '带动画的链接',
            path: '/_posts/LinkAnimation'
          }
        ]
      },
      {
        title: '烧肉のJavaScript小抄',
        path: '/_posts/String',
        collapsable: false,
        children: [
          {
            title: 'let,vat和const三者比较',
            path: '/_posts/DifferenceBetweenLetAndVar'
          },
          {
            title: 'substr,substring和slice三者的比较',
            path: '/_posts/String'
          },
          {
            title: '生成多维数组的方法',
            path: '/_posts/MultidimensionalArray'
          },
          {
            title: 'Promise简记',
            path: '/_posts/Promise'
          }
        ]
      },
      {
        title: '烧肉のLinux小抄',
        path: '/_posts/Linux',
        collapsable: false,
        children: [
          {
            title: 'Linux笔记',
            path: '/_posts/Linux'
          }
        ]
      }
    ]
  },
  search: true,
  searchMaxSuggestions: 10,
  lastUpdated: '最后更新于',
  repo: 'https://github.com/1421582341'
}
