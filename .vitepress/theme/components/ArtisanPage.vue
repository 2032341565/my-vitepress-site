<template>
  <div class="artisan-page">
    <!-- 引入新的ArtisanHeader组件 -->
    <ArtisanHeader />

    <!-- 使用新的ArtisanProfile组件 -->
    <ArtisanProfile />

    <!-- 核心语录区域 - 使用新组件 -->
    <QuotesCarousel />

    <!-- 传承与创新区域 - 使用新组件 -->
    <InnovationSection />

    <!-- 作品展示轮播 - 使用新组件 -->
    <WorksCarousel />
  </div>
</template>

<script>
import ArtisanHeader from './ArtisanHeader.vue'
import ArtisanProfile from './ArtisanProfile.vue'
import QuotesCarousel from './QuotesCarousel.vue'
import StackedQuotesCarousel from './StackedQuotesCarousel.vue'
import InnovationSection from './InnovationSection.vue'
import WorksCarousel from './WorksCarousel.vue'

export default {
  name: 'ArtisanPage',
  components: {
    ArtisanHeader,
    ArtisanProfile,
    QuotesCarousel,
    StackedQuotesCarousel,
    InnovationSection,
    WorksCarousel
  },

}
</script>

<style scoped>
/* 全局样式 */
.artisan-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #1d1d1f;
  line-height: 1.6;
}
</style>