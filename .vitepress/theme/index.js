// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'

// 导入自定义布局组件
import CustomLayout from './components/CustomLayout.vue'

// 导入全局组件
import ContactInfo from './components/ContactInfo.vue'
import LeanCloudComment from './components/LeanCloudComment.vue'
import RootCarvingBanner from './components/RootCarvingBanner.vue'
import RootCarvingTimeline from './components/RootCarvingTimeline.vue'
import ValineComment from './components/ValineComment.vue'
import WorksGrid from './components/WorksGrid.vue'
import ArtisanPage from './components/ArtisanPage.vue'
import StackedQuotesCarousel from './components/StackedQuotesCarousel.vue'
import Timeline from './components/Timeline.vue'
import CommentSection from './components/CommentSection.vue'
import ContactSection from './components/ContactSection.vue'

/** @type {import('vitepress').Theme} */
export default {
  // 不再继承默认主题，使用完全自定义主题
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('ContactInfo', ContactInfo)
    app.component('LeanCloudComment', LeanCloudComment)
    app.component('RootCarvingBanner', RootCarvingBanner)
    app.component('RootCarvingTimeline', RootCarvingTimeline)
    app.component('ValineComment', ValineComment)
    app.component('WorksGrid', WorksGrid)
    app.component('ArtisanPage', ArtisanPage)
    app.component('StackedQuotesCarousel', StackedQuotesCarousel)
    app.component('Timeline', Timeline)
    app.component('CommentSection', CommentSection)
      app.component('ContactSection', ContactSection)
  }
}
