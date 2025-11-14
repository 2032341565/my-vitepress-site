import { defineConfig } from 'vitepress'
import timeline from 'vitepress-markdown-timeline'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "中国非遗根雕艺术",
  description: "传承千年文化，雕琢自然之美 - 中国非物质文化遗产根雕艺术展示平台",
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],
  markdown: {
    config: (md) => {
      md.use(timeline)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '匠人匠心', link: '/artisan' },
      { text: '发展脉络', link: '/development' },
      { text: '作品图鉴', link: '/works' },
      { text: '互动专区', link: '/interactive' },
      { text: '测试', link: '/test-stacked-carousel' },
    ],

    sidebar: [],

    footer: {
      message: '传承千年文化，雕琢自然之美',
      copyright: '© 2024 中国非遗根雕文化传承中心'
    }
  }
})
