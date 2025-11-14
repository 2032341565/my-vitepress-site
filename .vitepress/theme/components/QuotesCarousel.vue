<template>
  <section class="quotes-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="quotes-carousel">
        <div 
          v-for="(quote, index) in quotes" 
          :key="index"
          class="quote-card"
          :class="{ 'active': currentQuote === index }"
        >
          <blockquote>
            <p class="quote-text">{{ quote.text }}</p>
          </blockquote>
        </div>
      </div>
      <div class="quote-controls">
        <button 
          class="quote-nav"
          @click="prevQuote"
          aria-label="上一条语录"
        >
          &larr;
        </button>
        <div class="quote-indicators">
          <button 
            v-for="(quote, index) in quotes" 
            :key="index"
            class="quote-indicator"
            :class="{ 'active': currentQuote === index }"
            @click="currentQuote = index"
            aria-label="切换到第 {{ index + 1 }} 条语录"
          ></button>
        </div>
        <button 
          class="quote-nav"
          @click="nextQuote"
          aria-label="下一条语录"
        >
          &rarr;
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuotesCarousel',
  props: {
    title: {
      type: String,
      default: '核心语录'
    },
    quotes: {
      type: Array,
      default: () => [
        {
          text: "根雕艺术的精髓在于发现自然之美，并通过艺术家的双手赋予其新的生命与灵魂。"
        },
        {
          text: "传承不是简单的复制，创新也不是彻底的颠覆，而是在传统的基础上注入时代的活力。"
        },
        {
          text: "每一件根雕作品都是独一无二的，因为每一个树根都有其独特的生长历程。"
        }
      ]
    }
  },
  data() {
    return {
      currentQuote: 0,
      quoteInterval: null
    }
  },
  mounted() {
    // 自动轮播语录
    this.startQuoteAutoPlay();
  },
  beforeDestroy() {
    // 清理定时器
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
  },
  methods: {
    // 上一条语录 - 循环滚动
    prevQuote() {
      this.currentQuote = (this.currentQuote - 1 + this.quotes.length) % this.quotes.length;
      this.resetQuoteAutoPlay();
    },
     // 下一条语录 - 循环滚动
    nextQuote() {
      this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
      this.resetQuoteAutoPlay();
    },
    // 开始语录自动播放
    startQuoteAutoPlay() {
      this.quoteInterval = setInterval(() => {
        this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
      }, 6000);
    },
    // 重置语录自动播放定时器
    resetQuoteAutoPlay() {
      clearInterval(this.quoteInterval);
      this.startQuoteAutoPlay();
    }
  }
}
</script>

<style scoped>
/* 核心语录区域 */
.quotes-section {
  padding: 160px 0;
  background-color: #f5f5f7;
  position: relative;
  overflow: hidden;
}

.quotes-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(114, 46, 209, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(24, 144, 255, 0.03) 0%, transparent 50%);
  z-index: 0;
}

.quotes-carousel {
  position: relative;
  max-width: 900px;
  margin: 0 auto 60px;
  height: 200px;
  overflow: hidden;
  z-index: 1;
}

.quote-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 0.6s ease, transform 0.6s ease;
  z-index: 0;
}

.quote-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  z-index: 1;
}

.quote-text {
  font-size: 24px;
  line-height: 1.8;
  color: #1d1d1f;
  font-style: italic;
  margin: 0;
}

.quote-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.quote-nav {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d1d1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.quote-nav:hover:not(.disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* 移除禁用状态样式，因为现在支持循环滚动 */

.quote-indicators {
  display: flex;
  gap: 10px;
}

.quote-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d1d1d6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quote-indicator.active {
  background-color: var(--vp-c-primary, #722ed1);
  width: 20px;
  border-radius: 4px;
}
</style>