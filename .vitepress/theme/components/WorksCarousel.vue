<template>
  <section class="works-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="works-carousel">
        <div 
          class="carousel-track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="(work, index) in works" 
            :key="index"
            class="carousel-slide"
          >
            <div class="work-image-container">
              <div class="work-image" :style="{ backgroundImage: `url(${work.imageUrl})` }"></div>
            </div>
            <div class="work-info">
              <h3 class="work-title">{{ work.title }}</h3>
              <p class="work-year">{{ work.year }}</p>
              <p class="work-description">{{ work.description }}</p>
            </div>
          </div>
        </div>
        
        <button 
          class="carousel-nav carousel-nav--prev"
          @click="prevSlide"
          aria-label="上一件作品"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(0, 0, 0, 0.1)"/>
            <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button 
          class="carousel-nav carousel-nav--next"
          @click="nextSlide"
          aria-label="下一件作品"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(0, 0, 0, 0.1)"/>
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="carousel-indicators">
        <button 
          v-for="(work, index) in works" 
          :key="index"
          class="carousel-indicator"
          :class="{ 'active': currentSlide === index }"
          @click="goToSlide(index)"
          aria-label="查看 {{ work.title }}"
        ></button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WorksCarousel',
  props: {
    title: {
      type: String,
      default: '作品展示'
    },
    works: {
      type: Array,
      default: () => [
        {
          title: '龙凤呈祥',
          year: '2022年',
          description: '采用百年香樟木精心雕琢，作品形象生动，细节丰富，展现了传统吉祥文化的精髓。',
          imageUrl: '/images/rootcarving1.jpg'
        },
        {
          title: '松鹤延年',
          year: '2021年',
          description: '象征长寿与吉祥的经典题材，结合传统技艺与现代审美，作品栩栩如生。',
          imageUrl: '/images/rootcarving2.jpg'
        },
        {
          title: '自然之韵',
          year: '2020年',
          description: '以自然形态为灵感，保留木材原有纹理，展现禅意美学与自然和谐。',
          imageUrl: '/images/rootcarving3.jpg'
        },
        {
          title: '禅意',
          year: '2019年',
          description: '作品简约而不简单，通过简洁的线条和自然的纹理，传达出深厚的禅学意境。',
          imageUrl: '/images/rootcarving4.jpg'
        }
      ]
    }
  },
  data() {
    return {
      // 当前轮播图索引
      currentSlide: 0,
      // 自动播放定时器
      workInterval: null
    }
  },
  mounted() {
    // 自动轮播作品
    this.startWorkAutoPlay();
  },
  beforeDestroy() {
    // 清理定时器
    if (this.workInterval) {
      clearInterval(this.workInterval);
    }
  },
  methods: {
    // 上一张作品
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.works.length) % this.works.length;
      this.resetWorkAutoPlay();
    },
    
    // 下一张作品
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.works.length;
      this.resetWorkAutoPlay();
    },
    
    // 跳转到指定作品
    goToSlide(index) {
      this.currentSlide = index;
      this.resetWorkAutoPlay();
    },
    
    // 开始作品自动播放
    startWorkAutoPlay() {
      this.workInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    
    // 重置作品自动播放定时器
    resetWorkAutoPlay() {
      clearInterval(this.workInterval);
      this.startWorkAutoPlay();
    }
  }
}
</script>

<style scoped>
/* 作品展示轮播 */
.works-section {
  padding: 160px 0;
  background-color: #f5f5f7;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 60px;
  text-align: center;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.works-carousel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto 60px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.work-image-container {
  position: relative;
  overflow: hidden;
}

.work-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide:hover .work-image {
  transform: scale(1.05);
}

.work-info {
  padding: 60px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.work-title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #1d1d1f;
}

.work-year {
  font-size: 16px;
  color: var(--vp-c-primary, #722ed1);
  font-weight: 500;
  margin-bottom: 30px;
}

.work-description {
  font-size: 18px;
  line-height: 1.8;
  color: #6e6e73;
  margin: 0;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.3s ease;
}

.carousel-nav:hover {
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav--prev {
  left: 20px;
}

.carousel-nav--next {
  right: 20px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.carousel-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #d1d1d6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicator.active {
  background-color: var(--vp-c-primary, #722ed1);
  width: 24px;
  border-radius: 5px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .carousel-slide {
    grid-template-columns: 1.5fr 1fr;
  }
  
  .work-info {
    padding: 40px;
  }
}

@media (max-width: 1024px) {
  .section-title {
    font-size: 32px;
    margin-bottom: 50px;
  }
  
  .works-section {
    padding: 120px 0;
  }
  
  .carousel-slide {
    grid-template-columns: 1fr;
  }
  
  .work-info {
    padding: 40px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .works-section {
    padding: 100px 0;
  }
  
  .work-title {
    font-size: 28px;
  }
  
  .work-description {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 24px;
  }
  
  .works-section {
    padding: 80px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .work-info {
    padding: 30px 20px;
  }
  
  .work-title {
    font-size: 24px;
  }
}
</style>