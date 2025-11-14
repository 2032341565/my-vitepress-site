<template>
  <div class="root-carving-timeline">
    <h2 class="timeline-title" v-if="title">{{ title }}</h2>
    <div class="timeline-container">
      <div 
        v-for="(item, index) in timelineItems" 
        :key="index"
        class="timeline-item"
        :class="{ 'even': index % 2 === 1 }"
      >
        <!-- 时间轴中心线 -->
        <div class="timeline-line"></div>
        
        <!-- 时间轴节点 -->
        <div class="timeline-node">
          <div class="node-inner">{{ index + 1 }}</div>
        </div>
        
        <!-- 时间轴内容 -->
        <div class="timeline-content">
          <h3 class="timeline-item-title">{{ item.title }}</h3>
          <div class="timeline-item-content" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

// 定义组件属性
defineProps({
  // 时间轴标题
  title: {
    type: String,
    default: '发展历程'
  }
})

// 根雕艺术发展历程数据
const timelineItems = ref([
  {
    title: '根雕起源',
    content: '根雕艺术在中国有着悠久的历史，可以追溯到原始社会时期。古代人们就开始利用树根的自然形态制作简单的生活用品和装饰品。'
  },
  {
    title: '列入非遗时期（2006年）',
    content: '2006年，根雕艺术被正式列入国家级非物质文化遗产名录，得到了国家层面的保护和支持。'
  },
  {
    title: '根雕发展中心形成',
    content: '福建、浙江、广东等地形成了各具特色的根雕产业集群，建立了多个根雕艺术展示和销售中心。'
  },
  {
    title: '发展挑战期',
    content: '原材料资源短缺、传统技艺后继无人、市场推广不足等问题制约了根雕艺术的发展。'
  },
  {
    title: '发展创新阶段',
    content: '通过与现代设计、数字技术的结合，开发新的应用场景和商业模式，推动根雕艺术的创新发展。'
  },
  {
    title: '创新成果展示',
    content: '开发了根雕文创产品、根雕主题旅游线路、数字根雕艺术展示等多种创新形式。'
  },
  {
    title: '行业转型升级',
    content: '创新发展模式带动了整个根雕行业的转型升级，提高了行业的经济效益和社会影响力。'
  },
  {
    title: '政策支持体系',
    content: `相关政策文件：<br><ul><li><a href="#">《关于加强非物质文化遗产保护工作的意见》</a></li><li><a href="#">《传统工艺振兴计划》</a></li><li><a href="#">《文化产业促进法》</a></li></ul>`
  }
])
</script>

<style scoped>
.root-carving-timeline {
  padding: 2rem 0;
}

.timeline-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #8a6d3b, #d4a76a);
  margin: 0.8rem auto 0;
  border-radius: 3px;
}

.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  transition: transform 0.3s ease;
}

.timeline-item:hover {
  transform: translateX(5px);
}

/* 偶数项（右侧）的样式 */
.timeline-item.even {
  flex-direction: row-reverse;
}

.timeline-item.even:hover {
  transform: translateX(-5px);
}

/* 时间轴中心线 */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: -2.5rem;
  width: 2px;
  background: linear-gradient(to bottom, #8a6d3b, #d4a76a);
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

/* 时间轴节点 */
.timeline-node {
  position: absolute;
  left: 50%;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #d4a76a;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline-node:hover {
  border-color: #8a6d3b;
  transform: translateX(-50%) scale(1.1);
}

.node-inner {
  font-size: 1rem;
  font-weight: bold;
  color: #8a6d3b;
}

/* 时间轴内容 */
.timeline-content {
  width: calc(50% - 60px);
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #d4a76a;
  position: relative;
  transition: all 0.3s ease;
}

.timeline-item.even .timeline-content {
  border-left: none;
  border-right: 4px solid #d4a76a;
}

.timeline-content:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* 内容卡片尖角装饰 */
.timeline-content::before {
  content: '';
  position: absolute;
  top: 20px;
  right: -12px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 0 12px 12px;
  border-color: transparent transparent transparent #fff;
}

.timeline-item.even .timeline-content::before {
  right: auto;
  left: -12px;
  border-width: 12px 12px 12px 0;
  border-color: transparent #fff transparent transparent;
}

.timeline-item-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 1rem 0;
  position: relative;
  padding-left: 0.5rem;
}

.timeline-item-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  padding-left: 0.5rem;
}

.timeline-item-content p {
  margin: 0 0 0.5rem 0;
}

.timeline-item-content ul {
  margin: 0;
  padding-left: 1.5rem;
}

.timeline-item-content a {
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
}

.timeline-item-content a:hover {
  color: #40a9ff;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline-item {
    flex-direction: column;
    align-items: center;
  }
  
  .timeline-item.even {
    flex-direction: column;
  }
  
  .timeline-line {
    left: 50%;
  }
  
  .timeline-node {
    left: 50%;
    z-index: 3;
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-top: 1.5rem;
    border-left: 4px solid #d4a76a;
    border-right: none;
  }
  
  .timeline-item.even .timeline-content {
    border-left: 4px solid #d4a76a;
    border-right: none;
  }
  
  .timeline-content::before {
    top: -12px;
    right: auto;
    left: 20px;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #fff transparent;
  }
  
  .timeline-item.even .timeline-content::before {
    top: -12px;
    left: 20px;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #fff transparent;
  }
  
  .timeline-title {
    font-size: 1.5rem;
  }
  
  .timeline-item-title {
    font-size: 1.2rem;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }
.timeline-item:nth-child(7) { animation-delay: 0.7s; }
.timeline-item:nth-child(8) { animation-delay: 0.8s; }
</style>