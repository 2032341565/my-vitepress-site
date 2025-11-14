<template>
  <div class="contact-section">
    <!-- 联系我们标题 -->
    <div class="section-header">
      <h2 class="section-title">
        <span class="section-text">{{ sectionTitle }}</span>
        <span class="section-divider"></span>
      </h2>
      <p class="section-description">{{ sectionDescription }}</p>
    </div>

    <!-- 联系信息卡片 - Apple风格 -->
    <div class="contact-cards">
      <div 
        v-for="(item, index) in contactItems" 
        :key="index" 
        class="contact-card"
        :class="getCardClass(item.label)"
      >
        <div class="contact-icon">{{ getContactIcon(item.label) }}</div>
        <div class="contact-content">
          <h3 class="contact-title">{{ item.label }}</h3>
          <p class="contact-value">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactSection',
  props: {
    sectionTitle: {
      type: String,
      default: '联系我们'
    },
    sectionDescription: {
      type: String,
      default: '关于根艺馆的联系方式和地址'
    },
    contactItems: {
      type: Array,
      default: () => [
        {
          label: '电话',
          value: '138-0000-0000'
        },
        {
          label: '邮箱',
          value: 'info@genart.com'
        },
        {
          label: '地址',
          value: '中国浙江省杭州市西湖区文创园区A座'
        }
      ]
    }
  },
  methods: {
    getCardClass(label) {
      // 根据不同联系方式类型返回不同的卡片样式
      switch(label) {
        case '电话':
          return 'card-phone';
        case '邮箱':
          return 'card-email';
        case '地址':
          return 'card-location';
        default:
          return '';
      }
    },
    getContactIcon(label) {
      // 返回不同的图标字符（可以使用Unicode字符或其他方式）
      switch(label) {
        case '电话':
          return '📱';
        case '邮箱':
          return '📧';
        case '地址':
          return '📍';
        default:
          return '📌';
      }
    }
  }
}
</script>

<style scoped>
.contact-section {
  margin: 0;
  padding: 2rem 0;
}

/* 标题区域样式 */
.section-header {
  margin: 0 0 3rem;
  opacity: 0;
  transform: translateY(15px);
  animation: fadeInUp 0.6s ease forwards 0.8s;
  text-align: center;
}

.section-title {
  display: inline-flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 2.25rem;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
  position: relative;
}

.section-text {
  transition: transform 0.3s ease;
}

.section-title:hover .section-text {
  transform: translateY(-2px);
}

.section-divider {
  height: 1px;
  flex-grow: 1;
  background-color: var(--vp-c-border);
  margin-left: 1.5rem;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.section-title:hover .section-divider {
  transform: scaleX(1);
}

.section-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin: 0 auto;
  line-height: 1.6;
  max-width: 700px;
}

/* 联系卡片容器 - Apple风格 */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* 联系卡片 - Apple风格 */
.contact-card {
  background: rgba(245, 245, 247, 0.5);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.contact-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}

/* 联系图标 */
.contact-icon {
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
  flex-shrink: 0;
}

/* 联系内容 */
.contact-content {
  flex: 1;
}

.contact-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.contact-value {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
  letter-spacing: 0.01em;
  transition: color 0.3s ease;
}

.contact-card:hover .contact-value {
  color: var(--vp-c-brand);
}

/* 特定类型卡片的颜色区分 */
.card-phone .contact-icon {
  background: linear-gradient(135deg, rgba(10, 132, 255, 0.1), rgba(10, 132, 255, 0.2));
}

.card-email .contact-icon {
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.1), rgba(52, 199, 89, 0.2));
}

.card-location .contact-icon {
  background: linear-gradient(135deg, rgba(255, 69, 58, 0.1), rgba(255, 69, 58, 0.2));
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(10, 132, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(10, 132, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(10, 132, 255, 0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .section-title {
    font-size: 2rem;
  }
  
  .contact-cards {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 1.5rem 0;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    flex-direction: column;
    align-items: center;
  }
  
  .section-divider {
    margin-left: 0;
    margin-top: 0.75rem;
    width: 80px;
  }
  
  .section-description {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .contact-cards {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .contact-card {
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .contact-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  
  .contact-title {
    font-size: 1rem;
  }
  
  .contact-value {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .contact-card {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .contact-icon {
    font-size: 1.75rem;
    width: 45px;
    height: 45px;
  }
}
</style>