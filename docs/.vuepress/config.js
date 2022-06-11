module.exports = {
  title: '生姜烧肉的博客',
  description: '生姜烧肉的博客',
  theme: 'reco',
  base: '/learn-note',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    subSidebar: 'auto'
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '生姜烧肉',
        items: [{ text: 'Github', link: 'https://github.com/1421582341' }]
      }
    ],
    sidebar: [
      {
        title: 'Welcome',
        path: '/',
        collapsable: false // 不折叠
        // children: [{ title: 'Welcome Page', path: '/' }]
      },
      {
        title: 'Markdown学习',
        path: '/handbook/Sample',
        collapsable: false // 不折叠
      },
      {
        title: 'TODO',
        path: '/handbook/TODO',
        collapsable: false
      },
      {
        title: '烧肉のCSS小抄',
        path: '/handbook/LinkAnimation',
        collapsable: false,
        children: [{ title: '带动画的链接', path: '/handbook/LinkAnimation' }]
      },
      {
        title: '烧肉のJavaScript小抄',
        path: '/handbook/String',
        collapsable: false,
        children: [
          { title: 'substr,substring和slice三者的比较', path: '/handbook/String' },
          { title: '生成多维数组的方法', path: '/handbook/MultidimensionalArray' }
        ]
      }
    ]
  }
}
