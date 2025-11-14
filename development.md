---
title: 中国非遗根雕艺术 - 发展脉络
description: 探索中国根雕艺术的发展历程
---

<script setup>
// 时间线数据定义为变量
const timelineItems = [
  {
    id: 1,
    title: '根雕起源',
    content: '根雕艺术起源于原始社会时期，古人利用自然形态的树根制作简单的工具和装饰品。早期的根雕作品主要用于祭祀和实用，展现了人类对自然的观察和创造力。'
  },
  {
    id: 2,
    title: '引入非遗时期',
    content: '随着非物质文化遗产概念的引入，根雕艺术开始受到更广泛的关注和保护。这一时期，根雕艺术从传统手工艺逐渐转变为被认可的文化遗产形式，为后续的发展奠定了基础。'
  },
  {
    id: 3,
    title: '根雕发展中心',
    content: '全国各地相继建立了根雕艺术发展中心和研究机构，形成了多个具有地域特色的根雕艺术流派。这些中心不仅促进了根雕技艺的交流，也为根雕作品的展示和销售提供了平台。'
  },
  {
    id: 4,
    title: '根雕发展中产生的问题',
    content: '在快速发展过程中，根雕艺术也面临着原料资源短缺、传统技艺传承困难、市场同质化严重等问题。这些挑战对根雕艺术的可持续发展提出了新的要求。'
  },
  {
    id: 5,
    title: '根雕艺术创新',
    content: '面对发展中的挑战，新一代根雕艺术家开始探索创新之路，将现代设计理念与传统技艺相结合，创作出具有时代特色的根雕作品。创新不仅体现在题材和表现形式上，也包括材料的多元化运用。'
  },
  {
    id: 6,
    title: '创新成果展示',
    content: '近年来，各类根雕艺术展览和比赛在全国范围内频繁举办，展示了根雕艺术的创新成果。这些活动不仅提高了根雕艺术的知名度，也为艺术家们提供了交流和学习的机会。'
  },
  {
    id: 7,
    title: '对根雕同行业的影响',
    content: '创新发展的理念逐渐影响了整个根雕行业，促使更多从业者开始重视作品的文化内涵和艺术价值。行业内的良性竞争也推动了根雕艺术整体水平的提高，形成了更加健康的发展生态。'
  },
  {
    id: 8,
    title: '政策支持（非遗）',
    content: '国家和地方政府出台了一系列支持非物质文化遗产保护和发展的政策措施，为根雕艺术的传承和发展提供了有力保障。这些政策包括资金支持、传承人培养、市场推广等多个方面，为根雕艺术的未来发展创造了良好环境。',
    hasLink: true
  }
];
</script>


<!-- 新的Header部分，参考Mac官网风格 -->
<div class="header-section">
  <div class="header-content">
    <h1 class="header-title">根雕艺术发展历程</h1>
    <p class="header-subtitle">探索中国非遗根雕艺术的演变与传承</p>
    <div class="header-cta">
      <a id="exploreTimelineButton" class="header-link" onclick="var el = document.getElementById('timeline-section'); if(el) { el.scrollIntoView({ behavior: 'smooth' }); }">探索发展脉络 ↓</a>
    </div>
  </div>
  <div class="header-image-container">
    <img src="/images/rootcarving1.jpg" alt="根雕艺术主题图片" class="header-image">
    <div class="header-image-overlay"></div>
  </div>
</div>

<!-- 使用Timeline组件 -->
<div id="timeline-section">
  <Timeline :items="timelineItems" />
</div>

<style>
/* Mac风格的全局样式 */
:root {
  --primary-color: #0071e3;
  --text-color: #1d1d1f;
  --text-secondary: #86868b;
  --light-gray: #f5f5f7;
  --dark-gray: #1d1d1f;
  --border-color: #d2d2d7;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 新的Header样式 - 参考Mac官网风格 */
.header-section {
  position: relative;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 60px;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 0 20px;
  max-width: 800px;
}

.header-title {
  font-size: 4.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-color);
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: fadeUp 0.8s ease-out;
}

.header-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 32px;
  color: var(--text-secondary);
  line-height: 1.4;
  animation: fadeUp 0.8s ease-out 0.2s both;
}

.header-cta {
  animation: fadeUp 0.8s ease-out 0.4s both;
}

.header-link {
  display: inline-flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--primary-color);
  text-decoration: none;
  transition: opacity 0.3s ease;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: rgba(0, 113, 227, 0.08);
}

.header-link:hover {
  opacity: 0.8;
}

#timeline-section {
  padding-top: 100px;
}

.chevron {
  margin-left: 8px;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.header-link:hover .chevron {
  transform: translateY(3px);
}

.header-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7);
  transform: scale(1.02);
  transition: transform 0.6s ease;
}

.header-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.9) 100%);
}

/* 动画效果 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .header-title {
    font-size: 3.5rem;
  }
  
  .header-subtitle {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .header-section {
    min-height: 500px;
  }
  
  .header-title {
    font-size: 2.75rem;
  }
  
  .header-subtitle {
    font-size: 1.125rem;
    margin-bottom: 24px;
  }
  
  .header-link {
    font-size: 1rem;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .header-section {
    min-height: 400px;
    margin-bottom: 40px;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .header-title {
    font-size: 2.25rem;
    letter-spacing: -0.01em;
  }
  
  .header-subtitle {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  .header-link {
    font-size: 0.9375rem;
    padding: 7px 14px;
  }
  
  .chevron {
    font-size: 1rem;
  }
}

@media (max-width: 420px) {
  .header-title {
    font-size: 1.875rem;
  }
  
  .header-subtitle {
    font-size: 0.9375rem;
  }
  
  .header-image {
    transform: scale(1.1); /* 小屏幕上略微放大图片以避免空白 */
  }
}
</style>
