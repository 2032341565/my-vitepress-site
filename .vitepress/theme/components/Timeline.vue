<template>
  <div class="timeline-section">
    <div class="timeline-container">
      <div 
        v-for="(item, index) in items" 
        :key="item.id"
        class="timeline-segment"
      >
        <!-- 圆点 -->
        <div class="timeline-dot"></div>
        <!-- 连接线 -->
        <div class="timeline-line"></div>
        <!-- 内容卡片 -->
        <div class="timeline-content">
          <h3 class="timeline-heading">{{ item.title }}</h3>
          <p class="timeline-text">{{ item.content }}</p>
          <a v-if="item.hasLink" :href="item.link || '#'" class="policy-link">
            {{ item.linkText || '相关链接' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义组件接收的数据props
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => 
        item.id !== undefined && 
        item.title !== undefined && 
        item.content !== undefined
      );
    }
  }
});
</script>

<style scoped>
/* 时间线样式 - 优化版 */
.timeline-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.timeline-container {
  position: relative;
  padding-left: 50px;
}

.timeline-line {
  position: absolute;
  left: -35px; /* 相对于父容器的位置 */
  top: 0;
  width: 2px;
  height: calc(100% + 120px);
  background-color: var(--primary-color);
  border-radius: 1px;
  z-index: 1;
}

.timeline-segment:last-child .timeline-line {
  display: none;
}

/* 分段式时间线结构 */
.timeline-segment {
  position: relative;
  margin-bottom: 120px; /* 确保段与段之间有足够空间 */
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

/* 最后一个分段没有底部间距 */
.timeline-segment:last-child {
  margin-bottom: 0;
}

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

/* 为每个时间线项目添加延迟动画 */
.timeline-segment:nth-child(1) { animation-delay: 0.1s; }
.timeline-segment:nth-child(2) { animation-delay: 0.2s; }
.timeline-segment:nth-child(3) { animation-delay: 0.3s; }
.timeline-segment:nth-child(4) { animation-delay: 0.4s; }
.timeline-segment:nth-child(5) { animation-delay: 0.5s; }
.timeline-segment:nth-child(6) { animation-delay: 0.6s; }
.timeline-segment:nth-child(7) { animation-delay: 0.7s; }
.timeline-segment:nth-child(8) { animation-delay: 0.8s; }

/* 圆点设计 - 确保在时间线上 */
.timeline-dot {
  position: absolute;
  left: -50px; /* 相对于父容器的位置 */
  top: 0;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
  z-index: 3; /* 确保圆点在最上层 */
}

/* 内部小圆点 - 确保精确居中 */
.timeline-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 113, 227, 0.3);
}

/* 悬停效果 */
.timeline-segment:hover .timeline-dot {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 113, 227, 0.4);
  transition: all 0.3s ease;
}

.timeline-content {
  background-color: white;
  padding: 24px 30px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-left: 10px;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--primary-color);
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.timeline-content:hover::before {
  opacity: 1;
}

.timeline-heading {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  position: relative;
  padding-bottom: 8px;
}

.timeline-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 1.5px;
}

.timeline-text {
  margin-bottom: 0;
  line-height: 1.7;
  color: var(--text-color);
  font-size: 15px;
}

.policy-link {
  display: inline-block;
  margin-top: 18px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 5px 15px rgba(0, 113, 227, 0.4);
}

.policy-link:hover {
  background-color: #005bcb;
  transform: translateY(-2px);
  box-shadow: 0 7px 20px rgba(0, 113, 227, 0.5);
}

.policy-link::after {
  content: '→';
  margin-left: 6px;
  transition: transform 0.3s ease;
}

.policy-link:hover::after {
  transform: translateX(3px);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .timeline-section {
    padding: 0 15px 35px;
  }
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 0 10px 30px;
  }
  
  .timeline-container {
    padding-left: 35px;
  }
  
  .timeline-container::before {
    left: -35px; /* 定位到圆点的位置 */
    transform: translateX(10px); /* 20px宽的圆点，圆心在10px处 */
    width: 2.5px;
    top: 10px; /* 20px高的圆点，圆心在10px处 */
  }
  
  .timeline-segment {
    margin-bottom: 40px;
  }
  
  .timeline-dot {
    left: -35px;
    width: 20px;
    height: 20px;
    border-width: 2.5px;
  }
  
  .timeline-dot::after {
    width: 6px;
    height: 6px;
  }
  
  .timeline-content {
    padding: 25px 28px;
    border-radius: 14px;
  }
  
  .timeline-heading {
    font-size: 23px;
    margin-bottom: 16px;
  }
  
  .timeline-text {
    font-size: 15px;
    line-height: 1.65;
  }
  
  .policy-link {
    padding: 7px 14px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .timeline-container {
    padding-left: 30px;
  }
  
  .timeline-container::before {
    left: -30px; /* 定位到圆点的位置 */
    transform: translateX(9px); /* 18px宽的圆点，圆心在9px处 */
    width: 2px;
    top: 9px; /* 18px高的圆点，圆心在9px处 */
  }
  
  .timeline-dot {
    left: -30px;
    width: 18px;
    height: 18px;
  }
  
  .timeline-content {
    padding: 20px 22px;
    border-radius: 12px;
  }
  
  .timeline-heading {
    font-size: 21px;
    margin-bottom: 14px;
  }
  
  .timeline-text {
    font-size: 14px;
  }
  
  .policy-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 400px) {
  .timeline-content {
    padding: 18px 20px;
  }
  
  .timeline-heading {
    font-size: 20px;
  }
  
  /* 移除小屏幕上的动画效果以提高性能 */
  .timeline-segment {
    animation: none;
    opacity: 1;
  }
}
</style>