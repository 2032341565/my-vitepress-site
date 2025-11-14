<template>
  <div class="root-carving-banner">
    <div class="banner-container">
      <!-- 图片区域 -->
      <div class="banner-image-container">
        <img 
          :src="imageUrl" 
          :alt="altText" 
          class="banner-image"
          @load="handleImageLoad"
        />
        <div class="image-overlay"></div>
      </div>
      
      <!-- 内容区域 -->
      <div class="banner-content" :class="{ 'image-loaded': isImageLoaded }">
        <h1 class="banner-title">{{ title }}</h1>
        <p class="banner-subtitle" v-if="subtitle">{{ subtitle }}</p>
        
        <!-- 按钮组 -->
        <div class="banner-actions">
          <a 
            v-for="(button, index) in buttons" 
            :key="index"
            :href="button.href"
            :class="['action-button', button.primary ? 'primary' : 'secondary']"
            @mouseenter="buttonHovered = index"
            @mouseleave="buttonHovered = null"
            @click="handleButtonClick($event, button.href)"
            style="position: relative; z-index: 10; display: inline-block;"
          >
            <span class="button-text">{{ button.text }}</span>
            <span class="button-icon" v-if="button.icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RootCarvingBanner',
  props: {
    title: {
      type: String,
      default: '中国非遗根雕艺术'
    },
    subtitle: {
      type: String,
      default: '传承千年的工艺，将自然之美与人文精神完美融合'
    },
    imageUrl: {
      type: String,
      default: '/images/rootcarving1.jpg'
    },
    altText: {
      type: String,
      default: '根雕艺术'
    },
    buttons: {
      type: Array,
      default: () => [
        {
          text: '探索作品',
          href: '#works',
          primary: true,
          icon: true
        },
        {
          text: '了解匠人',
          href: '/artisan',
          primary: false,
          icon: true
        }
      ]
    }
  },
  data() {
    return {
      isImageLoaded: false,
      buttonHovered: null
    }
  },
  methods: {
    handleButtonClick(event, href) {
      // 处理锚点链接跳转
      if (href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    },
    handleImageLoad() {
      this.isImageLoaded = true;
    }
  }
}
</script>

<style scoped>
.root-carving-banner {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.banner-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图片容器样式 */
.banner-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 图片悬停效果 */
.banner-image-container:hover .banner-image {
  transform: scale(1.03);
}

/* 图片覆盖层 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.2) 100%);
  z-index: 1;
}

/* 内容区域 */
.banner-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 2rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.banner-content.image-loaded {
  transform: translateY(0);
  opacity: 1;
}

/* 标题样式 */
.banner-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transform: translateY(20px);
}

/* 副标题样式 */
.banner-subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.4s;
  opacity: 0;
  transform: translateY(20px);
}

/* 按钮容器 */
.banner-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.6s;
  opacity: 0;
  transform: translateY(20px);
}

/* 按钮基础样式 */
.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

/* 主按钮样式 */
.action-button.primary {
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.action-button.primary:hover {
  background-color: rgba(255, 255, 255, 0.95);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
}

/* 次要按钮样式 */
.action-button.secondary {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(5px);
}

.action-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

/* 按钮动画效果 */
.action-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none; /* 确保不阻止点击事件 */
}

.action-button:hover::before {
  width: 300px;
  height: 300px;
}

.button-text,
.button-icon {
  position: relative;
  z-index: 1;
}

/* 按钮图标动画 */
.button-icon {
  transition: transform 0.3s ease;
}

.action-button:hover .button-icon {
  transform: translateX(3px);
}

/* 动画定义 */
@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner-container {
    height: 400px;
    max-height: 60vh;
  }
  
  .banner-content {
    margin: 0 1rem;
    padding: 1.5rem;
  }
  
  .banner-title {
    font-size: clamp(2rem, 5vw, 3rem);
  }
  
  .banner-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
    max-width: 220px;
  }
}

@media (max-width: 480px) {
  .banner-container {
    height: 350px;
  }
  
  .banner-content {
    padding: 1rem;
  }
  
  .banner-subtitle {
    margin-bottom: 1.5rem;
  }
}
</style>