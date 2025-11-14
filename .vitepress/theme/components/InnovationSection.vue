<template>
  <section class="innovation-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="innovation-grid">
        <div 
          v-for="(item, index) in innovationItems" 
          :key="index"
          class="innovation-card"
        >
          <div class="card-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" v-html="item.icon"></svg>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="video-placeholder">
            <svg class="play-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="rgba(255, 255, 255, 0.9)"/>
              <path d="M9 8L16 12L9 16V8Z" fill="currentColor"/>
            </svg>
          </div>
          <p class="card-description">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InnovationSection',
  props: {
    title: {
      type: String,
      default: '传承与创新'
    },
    innovationItems: {
      type: Array,
      default: () => [
        {
          title: '市场瓶颈',
          description: '传统根雕作品的市场认知度有限，价格体系不完善，影响了年轻一代从业者的积极性。通过数字化营销和跨界合作，正在探索新的市场路径。',
          icon: `<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V12L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
        },
        {
          title: '创新技艺应用',
          description: '通过现代设计理念的融入，将根雕艺术与实用家居、装饰设计相结合，拓展了应用场景，赋予传统技艺新的生命力。',
          icon: `<path d="M17 16H7C5.89543 16 5 15.1046 5 14V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V14C19 15.1046 18.1046 16 17 16Z" stroke="currentColor" stroke-width="1.5"/><path d="M9 9L12 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 20H9C7.89543 20 7 19.1046 7 18V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 16V18C15 19.1046 14.1046 20 13 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
        },
        {
          title: '传承技艺发展',
          description: '建立系统化的培训体系，通过师徒传承、学校教育、线上教学等多种方式培养新一代传承人，确保技艺的可持续发展。',
          icon: `<path d="M4 8V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H6C4.89543 6 4 6.89543 4 8Z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 9V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 8L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 8L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 传承与创新区域 */
.innovation-section {
  padding: 160px 0;
  background-color: #ffffff;
}

.innovation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.innovation-card {
  background-color: #f5f5f7;
  border-radius: 16px;
  padding: 40px;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

.innovation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-primary, #722ed1), #1890ff);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.innovation-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.innovation-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  margin-bottom: 30px;
  color: var(--vp-c-primary, #722ed1);
}

.card-title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #1d1d1f;
}

.video-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #1d1d1f;
  border-radius: 12px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.video-placeholder:hover {
  background-color: #333333;
}

.video-placeholder:hover .play-icon {
  transform: scale(1.1);
}

.play-icon {
  color: var(--vp-c-primary, #722ed1);
  transition: transform 0.3s ease;
}

.card-description {
  font-size: 16px;
  line-height: 1.7;
  color: #6e6e73;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .innovation-grid {
    gap: 30px;
  }
}

@media (max-width: 992px) {
  .innovation-section {
    padding: 120px 0;
  }
  
  .innovation-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .innovation-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .innovation-card {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .innovation-section {
    padding: 80px 0;
  }
  
  .innovation-card {
    padding: 25px;
  }
  
  .card-icon svg {
    width: 40px;
    height: 40px;
  }
}
</style>