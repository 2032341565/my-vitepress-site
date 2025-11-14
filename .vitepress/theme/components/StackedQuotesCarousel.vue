<template>
  <div class="stacked-quotes-carousel">
    <!-- 标题 -->
    <h2 v-if="title" class="carousel-title">{{ title }}</h2>
    
    <!-- 轮播容器 -->
    <div class="carousel-wrapper">
      <!-- 滑动容器 -->
      <div 
        class="carousel-slider"
        ref="sliderRef"
        @scroll="handleScroll"
        :style="{ transform: `translateX(${sliderOffset}px)` }"
      >
        <!-- 卡片列表 -->
        <div class="cards-container">
          <div 
            v-for="(quote, index) in quotes" 
            :key="index"
            class="quote-card"
            :class="{ 
              'active': index === currentIndex,
              'prev': index === currentIndex - 1,
              'next': index === currentIndex + 1
            }"
            @click="scrollToIndex(index)"
            :style="getCardStyle(index)"
          >
            <!-- 卡片内容 -->
            <div class="card-content">
              <p class="quote-text">{{ quote.text }}</p>
              <div class="author-info">
                <div class="author-name">{{ quote.author }}</div>
                <div class="author-title">{{ quote.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <div class="carousel-controls">
        <button 
          class="control-btn prev-btn"
          @click="prevCard"
          aria-label="Previous quote"
        >
          &lt;
        </button>
        <button 
          class="control-btn next-btn"
          @click="nextCard"
          aria-label="Next quote"
        >
          &gt;
        </button>
      </div>
    </div>
    
    <!-- 底部指示器 -->
    <div class="carousel-indicators">
      <div 
        v-for="(quote, index) in quotes" 
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="scrollToIndex(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StackedQuotesCarousel',
  props: {
    // 标题属性
    title: {
      type: String,
      default: ''
    },
    // 自动播放属性
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 播放间隔（毫秒）
    autoPlayInterval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      // 当前索引
      currentIndex: 0,
      // 滑动偏移量
      sliderOffset: 0,
      // 卡片宽度
      cardWidth: 320,
      // 卡片间距
      cardSpacing: 16,
      // 自动播放定时器
      autoPlayTimer: null,
      // 语录数据
      quotes: [
        {
          text: "根雕艺术是自然与人文的完美融合，每一件作品都是独一无二的生命礼赞。",
          author: "陈明远",
          title: "国家级非遗根雕传承人"
        },
        {
          text: "在树根的纹理中，我看到了时间的痕迹和自然的智慧。",
          author: "张山林",
          title: "资深根雕艺术家"
        },
        {
          text: "真正的根雕艺术不是雕刻，而是发现与呈现。",
          author: "李根源",
          title: "根雕艺术大师"
        },
        {
          text: "每一件根雕作品都讲述着一个关于生命、自然与艺术的故事。",
          author: "王艺石",
          title: "现代根雕艺术家"
        },
        {
          text: "我们不创造美，我们只是大自然的翻译者。",
          author: "刘自然",
          title: "传统根雕工艺师"
        }
      ]
    }
  },
  mounted() {
    // 初始化自动播放
    if (this.autoPlay) {
      this.startAutoPlay();
    }
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    // 清理定时器和事件监听
    this.stopAutoPlay();
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 开始自动播放
    startAutoPlay() {
      this.stopAutoPlay(); // 先停止已有的定时器
      this.autoPlayTimer = setInterval(() => {
        this.nextCard();
      }, this.autoPlayInterval);
    },
    
    // 停止自动播放
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },
    
    // 处理窗口大小变化
    handleResize() {
      const containerWidth = this.$refs.sliderRef?.parentElement?.offsetWidth || 0;
      // 根据容器宽度动态调整卡片宽度
      this.cardWidth = Math.min(containerWidth * 0.7, 360);
      // 重新计算偏移量
      this.updateSliderOffset();
    },
    
    // 更新滑动偏移量 - 支持循环
    updateSliderOffset() {
      const containerWidth = this.$refs.sliderRef?.parentElement?.offsetWidth || 0;
      const centerOffset = (containerWidth - this.cardWidth) / 2;
      this.sliderOffset = centerOffset - (this.currentIndex * (this.cardWidth + this.cardSpacing));
    },
    
    // 上一张卡片 - 循环逻辑
    prevCard() {
      this.currentIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
      this.updateSliderOffset();
      // 重置自动播放
      if (this.autoPlay) {
        this.startAutoPlay();
      }
    },
    
    // 下一张卡片 - 循环逻辑
    nextCard() {
      this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
      this.updateSliderOffset();
      // 重置自动播放
      if (this.autoPlay) {
        this.startAutoPlay();
      }
    },
    
    // 跳转到指定索引
    scrollToIndex(index) {
      if (index >= 0 && index < this.quotes.length) {
        this.currentIndex = index;
        this.updateSliderOffset();
        // 重置自动播放
        if (this.autoPlay) {
          this.startAutoPlay();
        }
      }
    },
    
    // 处理滚动事件
    handleScroll() {
      // 手动滚动时停止自动播放
      this.stopAutoPlay();
    },
    
    // 获取卡片样式 - 支持循环
    getCardStyle(index) {
      const baseStyle = {
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transformOrigin: 'center center'
      };
      
      // 计算循环索引差（处理首尾相连的情况）
      const totalQuotes = this.quotes.length;
      let indexDiff = Math.abs(index - this.currentIndex);
      // 取最小距离（循环方向）
      indexDiff = Math.min(indexDiff, totalQuotes - indexDiff);
      
      // 当前活动卡片
      if (index === this.currentIndex) {
        return {
          ...baseStyle,
          transform: 'scale(1)',
          opacity: 1,
          zIndex: 30,
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
          width: `${this.cardWidth}px`
        };
      }
      // 相邻卡片（前后各一张）
      else if (indexDiff === 1) {
        return {
          ...baseStyle,
          transform: 'scale(0.85)',
          opacity: 0.8,
          zIndex: 20,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          width: `${this.cardWidth}px`
        };
      }
      // 离当前卡片较远的
      else if (indexDiff === 2) {
        return {
          ...baseStyle,
          transform: 'scale(0.75)',
          opacity: 0.6,
          zIndex: 10,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
          width: `${this.cardWidth}px`
        };
      }
      // 更远的卡片
      else {
        return {
          ...baseStyle,
          transform: 'scale(0.7)',
          opacity: 0.4,
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
          width: `${this.cardWidth}px`
        };
      }
    }
  }
};
</script>

<style scoped>
/* 组件容器 */
.stacked-quotes-carousel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

/* 标题样式 */
.carousel-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 轮播容器 */
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  margin: 0 auto;
}

/* 滑动容器 */
.carousel-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 卡片列表容器 */
.cards-container {
  display: flex;
  gap: 16px;
  align-items: center;
  height: 100%;
  padding: 0 20%; /* 左右留白，保证第一张和最后一张卡片也能居中 */
}

/* 卡片基础样式 */
.quote-card {
  position: relative;
  min-width: 320px;
  height: 300px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(142, 142, 147, 0.1);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 卡片内容 */
.card-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 语录文本 */
.quote-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #1d1d1f;
  margin-bottom: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  font-weight: 400;
  flex: 1;
  display: flex;
  align-items: center;
}

/* 作者信息 */
.author-info {
  text-align: center;
}

/* 作者姓名 */
.author-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
}

/* 作者头衔 */
.author-title {
  font-size: 0.85rem;
  color: #8e8e93;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  font-weight: 400;
}

/* 卡片悬停效果 */
.quote-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  z-index: 40;
}

/* 导航控制按钮 */
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 50;
  pointer-events: none;
}

/* 控制按钮样式 */
.control-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(142, 142, 147, 0.2);
  color: #1d1d1f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 300;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.control-btn:active {
  transform: scale(0.95);
}

/* 底部指示器 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
}

/* 单个指示器 */
.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(142, 142, 147, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 活动指示器 */
.indicator.active {
  width: 30px;
  border-radius: 5px;
  background: #0071e3;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .cards-container {
    padding: 0 15%;
  }
  
  .quote-card {
    min-width: 280px;
    height: 280px;
  }
  
  .carousel-wrapper {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .stacked-quotes-carousel {
    padding: 1.5rem 0.5rem;
  }
  
  .carousel-wrapper {
    height: 380px;
  }
  
  .cards-container {
    padding: 0 10%;
  }
  
  .quote-card {
    min-width: 260px;
    height: 260px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .quote-text {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .carousel-wrapper {
    height: 350px;
  }
  
  .cards-container {
    padding: 0 5%;
  }
  
  .quote-card {
    min-width: 240px;
    height: 240px;
  }
  
  .card-content {
    padding: 1.25rem;
  }
  
  .quote-text {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .control-btn {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
  
  .carousel-indicators {
    gap: 6px;
    margin-top: 1.5rem;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
  }
  
  .indicator.active {
    width: 24px;
  }
}
</style>