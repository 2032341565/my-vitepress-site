<template>
  <section class="profile-section">
    <!-- 背景装饰元素 - Mac风格视觉效果 -->
    <div class="bg-decorations">
      <div class="bg-blur-circle bg-blur-circle-1"></div>
      <div class="bg-blur-circle bg-blur-circle-2"></div>
    </div>
    
    <div class="container">
      <!-- 标题区域 - Mac风格居中大标题 -->
      <h2 class="main-title animate-fade-in-up">{{ sectionTitle }}</h2>
      
      <div class="profile-grid animate-fade-in-up">
        <!-- 图片区域 - Mac风格精致展示 -->
        <div class="profile-image-container">
          <div class="profile-image" :style="{ backgroundImage: `url(${profileImage})` }"></div>
          <div class="image-overlay">
            <span class="overlay-text">{{ artisanName }}</span>
          </div>
        </div>
        
        <!-- 内容区域 - Mac风格排版 -->
        <div class="profile-content">
          <p class="profile-description">{{ description }}</p>

          <!-- 职业转折点 - Mac风格精致时间线 -->
          <h3 class="timeline-title">{{ timelineTitle }}</h3>
          <div class="timeline-container">
            <div class="timeline">
              <!-- 主竖线 -->
              <div class="timeline-line"></div>
              
              <div 
                v-for="(item, index) in timelineData" 
                :key="index"
                class="timeline-item"
                :data-index="index"
                :ref="el => timelineRefs[index] = el"
              >
                <!-- 年份作为时间点标记 -->
                <div class="timeline-year">{{ item.year }}</div>
                
                <!-- 连接年份和内容的竖线 -->
                <div class="timeline-connector"></div>
                
                <div class="timeline-content">
                  <div class="timeline-event">{{ item.event }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtisanProfile',
  props: {
    artisanName: {
      type: String,
      default: '根雕传承人 张三'
    },
    sectionTitle: {
      type: String,
      default: '传承人简介'
    },
    description: {
      type: String,
      default: '根雕传承人张三，自幼跟随父亲学习传统根雕技艺，至今已有四十余年的从业经验。\n他的作品融合了传统与现代元素，多次获得国家级工艺美术奖项。'
    },
    timelineTitle: {
      type: String,
      default: '职业转折点'
    },
    timelineData: {
      type: Array,
      default: () => [
        { year: '1982', event: '开始跟随父亲学习传统根雕技艺' },
        { year: '1990', event: '作品首次在省级工艺美术展览中获奖' },
        { year: '2000', event: '创办个人工作室，开始收徒传艺' },
        { year: '2020', event: '被评为国家级非物质文化遗产传承人' }
      ]
    },
    profileImage: {
      type: String,
      default: '/images/person.jpg'
    }
  },
  data() {
    return {
      timelineRefs: [],
      observer: null,
      fadeObserver: null
    }
  },
  mounted() {
    // 使用Intersection Observer实现滚动动画
    this.setupIntersectionObserver()
    // 设置入场动画观察者
    this.setupFadeInObserver()
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
    if (this.fadeObserver) {
      this.fadeObserver.disconnect()
    }
  },
  methods: {
    setupIntersectionObserver() {
      // 确保DOM已渲染
      this.$nextTick(() => {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('timeline-item-visible')
            }
          })
        }, {
          rootMargin: '-5% 0px -5% 0px',
          threshold: 0.1
        })
        
        // 观察所有时间轴项
        this.timelineRefs.forEach(ref => {
          if (ref) {
            this.observer.observe(ref)
          }
        })
      })
    },
    
    // 设置入场动画观察者
    setupFadeInObserver() {
      this.$nextTick(() => {
        this.fadeObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.delay || '0'
              entry.target.style.animationDelay = delay + 's'
              entry.target.classList.add('animate-visible')
              this.fadeObserver.unobserve(entry.target)
            }
          })
        }, {
          rootMargin: '-10% 0px -10% 0px',
          threshold: 0.1
        })
        
        // 观察所有需要入场动画的元素
        document.querySelectorAll('.animate-fade-in-up').forEach(el => {
          this.fadeObserver.observe(el)
        })
      })
    }
  },
}
</script>

<style scoped>
/* Mac风格 - 大量留白、简洁字体、精致阴影 */
.profile-section {
  padding: 8rem 0 10rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2.5rem;
  position: relative;
  z-index: 10;
}

/* 主标题 - Mac风格居中 */
.main-title {
  font-size: 3.2rem;
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 5rem;
  margin-top: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.2;
  position: relative;
}

.main-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #0071e3;
  border-radius: 2px;
}

/* 网格布局优化 - 参考Mac官网黄金比例布局 */
  .profile-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 6rem;
    align-items: stretch;
    margin-bottom: 4rem;
    height: 100%;
}

  /* 图片容器优化 - Mac风格精致卡片设计 */
  .profile-image-container {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 650px;
    overflow: hidden;
    border-radius: 18px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.05);
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    flex-direction: column;
    background-color: #f5f5f7;
    cursor: pointer;
  }

  .profile-image-container:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  }

  /* 图片 - Mac风格精致图片效果 */
  .profile-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .profile-image-container:hover .profile-image {
    transform: scale(1.02);
    filter: brightness(1.05) contrast(1.02);
  }

  /* 图片叠加层 - Mac风格精致渐变叠加 */
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 70%);
    color: white;
    backdrop-filter: blur(3px);
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .profile-image-container:hover .image-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 70%);
  }

  .overlay-text {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    letter-spacing: 0.01em;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .profile-image-container:hover .overlay-text {
    transform: translateY(-4px);
  }

  /* 内容区域 - Mac风格排版，确保与图片容器底部对齐 */
  .profile-content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
  }

  .profile-description {
    font-size: 1.3rem;
    line-height: 1.85;
    color: #333333;
    margin-bottom: 4rem;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    letter-spacing: 0.01em;
    opacity: 0.95;
  }

  /* 标题样式调整 */
  .section-title {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #1d1d1f;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    letter-spacing: -0.01em;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #0071e3;
    border-radius: 2px;
  }

  /* 时间线标题 - Mac风格居中大标题 */
  .timeline-title {
    font-size: 2rem;
    margin: 1rem 0 4rem;
    color: #1d1d1f;
    font-weight: 600;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  /* 背景装饰元素 - Mac风格高级模糊效果 */
  .bg-decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .bg-blur-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.12;
    mix-blend-mode: overlay;
  }

  .bg-blur-circle-1 {
    width: 600px;
    height: 600px;
    background: #0071e3;
    top: -150px;
    right: -150px;
    animation: float 18s ease-in-out infinite;
  }

  .bg-blur-circle-2 {
    width: 500px;
    height: 500px;
    background: #5ac8fa;
    bottom: -100px;
    left: -150px;
    animation: float 20s ease-in-out infinite reverse;
  }

  /* 精致的浮动动画 */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.12;
    }
    25% {
      transform: translate(40px, 20px) scale(1.05);
      opacity: 0.15;
    }
    50% {
      transform: translate(20px, 40px) scale(1);
      opacity: 0.12;
    }
    75% {
      transform: translate(-20px, 20px) scale(0.95);
      opacity: 0.10;
    }
  }

  /* 入场动画样式 - Mac风格平滑动画 */
  .animate-fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .animate-fade-in-up.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 滚动触发的渐显动画 - Mac风格平滑过渡 */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .scroll-reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  /* 时间线容器优化 - 确保与图片底部对齐 */
  .timeline-container {
    position: relative;
    margin: 0 auto;
    max-width: 900px;
    padding: 1rem 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }

  /* 时间线 - 确保底部对齐 */
  .timeline {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }

  /* 主竖线 - 更精致的设计 */
  .timeline-line {
    position: absolute;
    left: 6rem;
    top: 1.5rem;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    height: calc(100% - 3rem);
    z-index: 1;
  }

  /* 时间线项目 - Mac风格精致时间线设计 */
    .timeline-item {
      position: relative;
      margin-bottom: 4rem;
      padding-left: 9rem;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

/* 添加交错延迟动画 */
.timeline-item:nth-child(1) {
  transition-delay: 0.1s;
}

.timeline-item:nth-child(2) {
  transition-delay: 0.2s;
}

.timeline-item:nth-child(3) {
  transition-delay: 0.3s;
}

.timeline-item:nth-child(4) {
  transition-delay: 0.4s;
}

.timeline-item.timeline-item-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 年份作为时间点标记 - 更精致的Mac风格设计 */
.timeline-year {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: -0.02em;
  z-index: 2;
  padding: 0.3rem 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  min-width: 8rem;
  text-align: right;
  padding-right: 2rem;
  opacity: 0.8;
}

/* 连接年份和内容的竖线 - 更精致 */
.timeline-connector {
  position: absolute;
  left: 8rem;
  top: 1.2rem;
  width: 1px;
  height: 1.8rem;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 内容卡片 - 更精致的Mac风格设计 */
.timeline-content {
  position: relative;
  background: transparent;
  padding: 0.5rem 0 0.5rem 1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 0;
}

.timeline-event {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #1d1d1f;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: 0.01em;
  padding: 0.8rem 0;
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 增强版Mac风格交互效果 - 更精致的视觉反馈 */
.timeline-item:hover .timeline-year {
  color: #0071e3;
  opacity: 1;
  transform: translateX(-8px);
}

.timeline-item:hover .timeline-connector {
  background-color: #0071e3;
  width: 2px;
  transform-origin: top;
  animation: connectorPulse 1.5s ease-in-out infinite;
}

@keyframes connectorPulse {
  0%, 100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(1.05);
    opacity: 0.9;
  }
}

.timeline-item:hover .timeline-event {
  color: #0071e3;
  transform: translateX(4px);
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 添加更精致的下划线动画 */
.timeline-event::after {
  content: '';
  position: absolute;
  left: 1rem;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #0071e3;
  transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-image: linear-gradient(90deg, #0071e3, #5ac8fa);
}

.timeline-item:hover .timeline-event::after {
  width: calc(100% - 1rem);
  animation: underlinePulse 2s ease-in-out infinite;
}

@keyframes underlinePulse {
  0%, 100% {
    opacity: 1;
    height: 2px;
  }
  50% {
    opacity: 0.8;
    height: 3px;
  }
}

/* 添加焦点状态 - 键盘可访问性 */
.timeline-year:focus {
  outline: 2px solid #0071e3;
  outline-offset: 4px;
  border-radius: 4px;
  color: #0071e3;
  opacity: 1;
}

/* 添加更精致的背景高亮效果 */
.timeline-item:hover {
  background-color: rgba(0, 113, 227, 0.02);
  border-radius: 12px;
  margin-left: -1.5rem;
  padding-left: 11.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 添加时间点装饰元素 */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 7.85rem;
  top: 1.2rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #0071e3;
  z-index: 3;
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.timeline-item:hover::before {
  transform: scale(1);
  box-shadow: 0 0 0 8px rgba(0, 113, 227, 0.1);
}

/* 增强时间线显示时的动画 */
.timeline-item.timeline-item-visible {
  animation: slideIn 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

/* 平板设备响应式设计 - Mac风格优雅适配 */
@media (max-width: 1200px) {
  .container {
    max-width: 1100px;
    padding: 0 2rem;
  }
  
  .main-title {
    font-size: 2.8rem;
    letter-spacing: -0.03em;
  }
  
  .profile-grid {
    gap: 4rem;
    align-items: stretch;
  }
  
  /* 增强Mac风格在中大屏幕上的显示效果 */
  .profile-image-container {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .profile-image-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
  }
}

/* 中大型平板 - Mac风格精致适配 */
@media (max-width: 992px) {
  .profile-section {
    padding: 5rem 0;
  }
  
  .main-title {
    font-size: 2.5rem;
    margin-bottom: 3.5rem;
    letter-spacing: -0.03em;
    text-align: center;
  }
  
  .profile-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    align-items: stretch;
  }
  
  .profile-content {
    min-height: auto;
    flex: 1;
  }
  
  .profile-image-container {
    padding-bottom: 100%;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }
  
  .profile-description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  }
  
  /* 时间线调整 */
  .timeline-title {
    font-size: 2rem;
    margin: 3rem 0 2.5rem;
    text-align: center;
    letter-spacing: -0.02em;
  }
  
  .timeline-container {
    max-width: 100%;
    padding: 0 1.5rem;
    margin: 0 auto;
  }
  
  .timeline-line {
    left: 5rem;
    top: 1.5rem;
    height: calc(100% - 3rem);
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .timeline-item {
    padding-left: 8rem;
    margin-bottom: 2.5rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .timeline-item:hover {
    background-color: rgba(0, 113, 227, 0.02);
    border-radius: 10px;
    margin-left: -1rem;
    padding-left: 9rem;
  }
  
  .timeline-year {
    font-size: 1.4rem;
    min-width: 7rem;
    padding-right: 1.5rem;
    font-weight: 600;
    color: #1d1d1f;
    opacity: 0.9;
  }
  
  .timeline-connector {
    left: 7rem;
    top: 1.2rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .timeline-content {
    padding: 0.5rem 0 0.5rem 1rem;
  }
  
  .timeline-event {
    font-size: 1.15rem;
    line-height: 1.7;
  }
  
  /* 时间点装饰元素调整 */
  .timeline-item::before {
    left: 6.85rem;
    top: 1.2rem;
  }
  
  /* 背景装饰调整 - Mac风格更精致的模糊效果 */
  .bg-blur-circle-1 {
    width: 450px;
    height: 450px;
    opacity: 0.08;
    filter: blur(100px);
  }
  
  .bg-blur-circle-2 {
    width: 400px;
    height: 400px;
    opacity: 0.08;
    filter: blur(100px);
  }
}

/* 中小型平板和大屏手机 - Mac风格精小适配 */
@media (max-width: 768px) {
  .profile-section {
    padding: 4rem 0;
    min-height: auto;
  }
  
  .main-title {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
    text-align: center;
    letter-spacing: -0.02em;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .profile-grid {
    gap: 3rem;
  }
  
  .profile-image-container {
    border-radius: 14px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  
  .profile-image-container:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  }
  
  .profile-image {
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .profile-image-container:hover .profile-image {
    transform: scale(1.015);
    filter: brightness(1.03);
  }
  
  .image-overlay {
    padding: 1.8rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 60%);
  }
  
  .overlay-text {
    font-size: 1.3rem;
    font-weight: 500;
  }
  
  .profile-description {
    font-size: 1.15rem;
    line-height: 1.75;
    margin-bottom: 2.5rem;
    color: #333;
  }
  
  .timeline-title {
    font-size: 1.8rem;
    text-align: center;
    margin: 2.5rem 0 2rem;
    letter-spacing: -0.02em;
  }
  
  .timeline-line {
    left: 4rem;
    top: 1.5rem;
    height: calc(100% - 3rem);
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .timeline-item {
    padding-left: 6.5rem;
    margin-bottom: 2rem;
    min-height: 60px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .timeline-item:hover {
    margin-left: -0.5rem;
    padding-left: 7rem;
    border-radius: 8px;
    background-color: rgba(0, 113, 227, 0.02);
  }
  
  .timeline-year {
    font-size: 1.3rem;
    min-width: 5.5rem;
    padding-right: 1.2rem;
    font-weight: 600;
    opacity: 0.85;
  }
  
  .timeline-connector {
    left: 5.5rem;
    top: 1.1rem;
    height: 1.5rem;
  }
  
  .timeline-content {
    padding: 0.5rem 0 0.5rem 0.8rem;
  }
  
  .timeline-event {
    font-size: 1.1rem;
    padding: 0.6rem 0;
    line-height: 1.6;
  }
  
  .timeline-event::after {
    left: 0.8rem;
    bottom: 0;
  }
  
  /* 时间点装饰元素调整 */
  .timeline-item::before {
    left: 5.35rem;
    top: 1.1rem;
    width: 7px;
    height: 7px;
  }
  
  .timeline-item:hover::before {
    box-shadow: 0 0 0 7px rgba(0, 113, 227, 0.1);
  }
  
  /* 背景装饰调整 - Mac风格更精致的模糊效果 */
  .bg-blur-circle-1 {
    width: 350px;
    height: 350px;
    opacity: 0.07;
    filter: blur(90px);
  }
  
  .bg-blur-circle-2 {
    width: 300px;
    height: 300px;
    opacity: 0.07;
    filter: blur(90px);
  }
  
  /* 动画优化 */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.07;
    }
    50% {
      transform: translate(25px, 25px) scale(1.05);
      opacity: 0.09;
    }
  }
}

/* 手机设备 - Mac风格极简精致适配 */
@media (max-width: 480px) {
  .profile-section {
    padding: 3rem 0 4rem;
    overflow: hidden;
  }
  
  .main-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  
  .container {
    padding: 0 1.2rem;
  }
  
  .profile-grid {
    gap: 2.5rem;
  }
  
  .profile-image-container {
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  
  .profile-image-container:active {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  }
  
  .profile-image {
    transition: transform 0.5s ease;
  }
  
  .profile-image-container:active .profile-image {
    transform: scale(1.01);
  }
  
  .image-overlay {
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%);
  }
  
  .overlay-text {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  
  .profile-description {
    font-size: 1rem;
    line-height: 1.65;
    margin-bottom: 2rem;
    color: #444;
    letter-spacing: 0.01em;
  }
  
  .timeline-title {
    font-size: 1.5rem;
    margin: 2rem 0 1.5rem;
    text-align: center;
    letter-spacing: -0.01em;
  }
  
  .timeline-container {
    padding: 0;
  }
  
  .timeline-line {
    left: 3rem;
    top: 1.2rem;
    height: calc(100% - 2.5rem);
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .timeline-item {
    padding-left: 5rem;
    margin-bottom: 1.8rem;
    min-height: 55px;
  }
  
  .timeline-year {
    font-size: 1.1rem;
    min-width: 4.5rem;
    padding-right: 0.8rem;
    font-weight: 600;
    opacity: 0.8;
  }
  
  .timeline-year:active {
    color: #0071e3;
    opacity: 1;
  }
  
  .timeline-connector {
    left: 4.5rem;
    top: 0.9rem;
    height: 1.2rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .timeline-content {
    padding-left: 0.5rem;
  }
  
  .timeline-event {
    font-size: 0.95rem;
    line-height: 1.55;
    padding: 0.5rem 0;
    letter-spacing: 0.01em;
  }
  
  .timeline-event:active {
    color: #0071e3;
    transform: translateX(2px);
  }
  
  .timeline-event::after {
    left: 0.5rem;
    bottom: 0;
    height: 1.5px;
  }
  
  /* 移动端交互优化 */
  .timeline-item:active {
    background-color: rgba(0, 113, 227, 0.03);
    border-radius: 6px;
    margin-left: -0.2rem;
    padding-left: 5.2rem;
  }
  
  .timeline-item:active .timeline-connector {
    background-color: #0071e3;
    width: 1.5px;
  }
  
  .timeline-item:active .timeline-event::after {
    width: calc(100% - 0.5rem);
  }
  
  /* 时间点装饰元素简化 */
  .timeline-item::before {
    left: 4.35rem;
    top: 0.9rem;
    width: 6px;
    height: 6px;
  }
  
  .timeline-item:active::before {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(0, 113, 227, 0.1);
  }
  
  /* 背景装饰简化 */
  .bg-blur-circle-1 {
    width: 250px;
    height: 250px;
    top: -70px;
    right: -70px;
    opacity: 0.06;
    filter: blur(70px);
  }
  
  .bg-blur-circle-2 {
    width: 220px;
    height: 220px;
    bottom: -70px;
    left: -70px;
    opacity: 0.06;
    filter: blur(70px);
  }
  
  /* 简化动画效果 */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.06;
    }
    50% {
      transform: translate(15px, 15px) scale(1.1);
      opacity: 0.08;
    }
  }
  
  /* 优化入场动画效果 */
  .animate-fade-in-up {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .timeline-item {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
}
</style>