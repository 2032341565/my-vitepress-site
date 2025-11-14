<template>
  <header class="artisan-header" :class="{ 'animate-in': isVisible }">
    <div class="header-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ArtisanHeader',
  data() {
    return {
      title: '匠人匠心',
      subtitle: '探索根雕传承人的艺术人生与匠心精神',
      scrollPosition: 0,
      isVisible: false
    }
  },
  mounted() {
    // 监听滚动事件，实现滚动时的微妙视差效果
    window.addEventListener('scroll', this.handleScroll)
    
    // 页面进入时触发动画
    setTimeout(() => {
      this.isVisible = true
    }, 100)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style scoped>
/* 基础重置和布局 */
.artisan-header {
  position: relative;
  min-height: 35vh;
  max-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #111111;
  padding: 6rem 2rem;
  transition: background-color 0.5s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              background-color 0.5s ease;
}

/* 加强的径向渐变背景 */
  .artisan-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.06) 0%, transparent 55%);
    pointer-events: none;
  }

/* 内容容器 */
.header-content {
  text-align: center;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0);
}

/* 主标题样式 - Mac风格 */
.hero-title {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    margin: 0 0 2.5rem 0;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.1;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    transition: color 0.3s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

/* 副标题样式 */
.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.3rem);
  margin: 0;
  color: #a1a1a6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  transition: color 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .artisan-header {
    min-height: 30vh;
    padding: 4rem 1.5rem;
  }
  
  .hero-title {
    font-size: clamp(2rem, 8vw, 3.5rem);
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
  }
}

/* 页面进入动画 */
.artisan-header.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.artisan-header.animate-in .hero-title {
  animation: titleReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.artisan-header.animate-in .hero-subtitle {
  animation: subtitleReveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}

@keyframes titleReveal {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    letter-spacing: -0.04em;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    letter-spacing: -0.02em;
  }
}

@keyframes subtitleReveal {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加细腻的交互效果 */
.artisan-header:hover .hero-title {
  color: #ffffff;
}

.artisan-header:hover .hero-subtitle {
  color: #ffffff;
}

.artisan-header:hover .header-content {
  transform: translateY(-3px);
}

/* 滚动时的视差效果 */
.artisan-header {
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* 加强的背景纹理 */
  .artisan-header::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2px, transparent 0),
      radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.04) 1px, transparent 0),
      radial-gradient(circle at 40px 60px, rgba(255, 255, 255, 0.06) 1px, transparent 0);
    background-size: 100px 100px;
    pointer-events: none;
    opacity: 0.7;
  }

/* 确保在各种设备上的文字清晰度 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .hero-title {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
}

/* 为标题添加装饰性底部线条 */
.hero-title {
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  transition: width 0.3s ease, background-color 0.3s ease;
}

.artisan-header:hover .hero-title::after {
  width: 60px;
  background-color: rgba(255, 255, 255, 0.7);
}

/* 确保内容在所有情况下都清晰可见 */
.header-content {
  position: relative;
  z-index: 2;
}
</style>