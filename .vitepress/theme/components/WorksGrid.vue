<template>
  <div class="works-grid-container">
    <h2 class="section-title">{{ title }}</h2>
    <div class="works-grid">
      <div 
        v-for="(item, index) in works" 
        :key="index"
        class="work-item"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <div class="image-container">
          <img 
            :src="item.imageUrl" 
            :alt="item.title" 
            class="work-image"
            loading="lazy"
          />
        </div>
        <div class="content-overlay">
          <div class="content-inner" :class="{ 'hover-active': hoveredIndex === index }">
            <h3 class="work-title">{{ item.title }}</h3>
            <p class="work-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorksGrid',
  props: {
    title: {
      type: String,
      default: '现代工艺展示'
    },
    works: {
      type: Array,
      default: () => [
        {
          title: '祥云观音',
          description: '传统人物题材作品，展现观音慈悲形象，采用天然香樟木精心雕琢而成。',
          imageUrl: '/images/rootcarving2.jpg'
        },
        {
          title: '松鹤延年',
          description: '象征长寿与吉祥的经典题材，结合传统技艺与现代审美，作品栩栩如生。',
          imageUrl: '/images/rootcarving3.jpg'
        },
        {
          title: '龙凤呈祥',
          description: '传统祥瑞图案，寓意美好祝福，采用名贵红木材料，工艺精湛，纹理天然。',
          imageUrl: '/images/rootcarving4.jpg'
        },
        {
          title: '自然禅意',
          description: '以自然形态为灵感，保留木材原有纹理，展现禅意美学与自然和谐。',
          imageUrl: '/images/rootcarving5.jpg'
        },
        {
          title: '花开富贵',
          description: '精湛的雕刻技艺展现牡丹盛开之姿，象征富贵吉祥，立体感强。',
          imageUrl: '/images/rootcarving6.jpg'
        }
      ]
    }
  },
  data() {
    return {
      hoveredIndex: null,
      isVisible: false
    }
  },
  mounted() {
    // 初始检查组件是否在视口中
    this.checkVisibility();
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', this.debounce(this.checkVisibility, 100));
  },
  beforeDestroy() {
    // 移除滚动事件监听器
    window.removeEventListener('scroll', this.debounce(this.checkVisibility, 100));
  },
  methods: {
    // 检查组件是否在视口中
    checkVisibility() {
      const element = this.$el;
      const rect = element.getBoundingClientRect();
      
      // 当组件的顶部进入视口底部100px或底部进入视口顶部时，认为组件可见
      const isVisible = (
        rect.top <= window.innerHeight - 100 &&
        rect.bottom >= 0
      );
      
      if (isVisible && !this.isVisible) {
        this.isVisible = true;
        this.$el.classList.add('visible');
      }
    },
    
    // 防抖函数，避免频繁触发滚动事件
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }
}
</script>

<style scoped>
.works-grid-container {
  padding: 120px 0;
  background-color: #ffffff;
  position: relative;
}

/* 添加微妙的背景元素，提升层次感 */
.works-grid-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-primary, #722ed1), #1890ff, #52c41a, #faad14);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: opacity 0.6s ease, transform 1s ease;
}

/* 当用户滚动到该区域时显示装饰条 */
.works-grid-container.visible::before {
  opacity: 1;
  transform: scaleX(1);
}

.section-title {
  text-align: center;
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 70px;
  color: var(--vp-c-text-1, #1d1d1f);
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--vp-c-primary, #722ed1);
  opacity: 0.8;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}

.work-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              box-shadow 0.5s ease, 
              z-index 0.1s ease;
  z-index: 1;
}

.work-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(1) saturate(1);
}

.work-item:hover .work-image {
  transform: scale(1.12);
  filter: brightness(1.05) saturate(1.05);
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.4) 60%, 
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  transition: background 0.6s ease;
}

.work-item:hover .content-overlay {
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.5) 50%, 
    rgba(0, 0, 0, 0.9) 100%
  );
}

.content-inner {
  color: white;
  padding: 30px;
  transform: translateY(20px);
  opacity: 0.7;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              opacity 0.6s ease;
}

.content-inner.hover-active {
  transform: translateY(0);
  opacity: 1;
}

.work-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 15px 0;
  letter-spacing: -0.3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.work-description {
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease 0.2s, 
              transform 0.5s ease 0.2s;
}

.content-inner.hover-active .work-description {
  opacity: 1;
  transform: translateY(0);
}

/* 添加微妙的悬停指示器 */
.work-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              opacity 0.6s ease;
  opacity: 0;
  pointer-events: none;
}

.work-item:hover::before {
  transform: translate(-50%, -50%) scale(15);
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .works-grid {
    gap: 25px;
    padding: 0 25px;
  }
  
  .works-grid-container {
    padding: 100px 0;
  }
}

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  .section-title {
    font-size: 38px;
    margin-bottom: 60px;
  }
  
  .content-inner {
    padding: 25px;
  }
  
  .work-title {
    font-size: 22px;
  }
  
  .work-description {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 20px;
  }
  
  .section-title {
    font-size: 34px;
    margin-bottom: 50px;
  }
  
  .work-item {
    aspect-ratio: 3/4;
    border-radius: 10px;
  }
  
  .content-inner {
    padding: 25px;
  }
  
  .work-title {
    font-size: 22px;
  }
  
  .work-description {
    font-size: 14px;
  }
  
  .works-grid-container {
    padding: 80px 0;
  }
}

@media (max-width: 480px) {
  .works-grid-container {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .content-inner {
    padding: 20px;
  }
  
  .work-title {
    font-size: 20px;
  }
  
  .work-description {
    font-size: 13px;
  }
  
  .section-title::after {
    width: 40px;
    bottom: -10px;
  }
}
</style>