---
title: 中国非遗根雕艺术 - 作品图鉴
description: 欣赏精美的根雕艺术品，感受传统工艺的魅力
---

<!-- 微纪录片标题 - 参考Mac官网风格设计 -->
<div class="title-section">
  <h2 class="animated-title">
    <span class="title-text"><span>微</span><span>纪</span><span>录</span><span>片</span></span>
    <span class="title-decoration"></span>
  </h2>
</div>

<div class="section documentary">
  <p>文字简介：介绍根雕艺术及其传承与创新意义（18分钟）</p>
  <div class="video-container">
    [视频播放器占位符 - 根雕艺术纪录片]
  </div>
</div>

<!-- 精品轮播展示标题 - 参考Mac官网风格设计 -->
<div class="title-section">
  <h2 class="animated-title">
    <span class="title-text"><span>精</span><span>品</span><span>轮</span><span>播</span><span>展</span><span>示</span></span>
    <span class="title-decoration"></span>
  </h2>
</div>

<div class="section carousel">
  <div class="featured-item">
    <div class="featured-image" style="background-image: url('/images/rootcarving1.jpg'); background-size: cover; background-position: center;"></div>
    <div class="featured-content">
      <h3>自然之魂</h3>
      <p>这件作品展现了大自然的鬼斧神工与艺术家的精湛技艺完美结合，通过保留树根的自然形态，赋予其新的生命与艺术内涵。</p>
      <p>作者：张明山</p>
      <p>创作时间：2023年</p>
    </div>
  </div>
  
  <div class="featured-item">
    <div class="featured-image" style="background-image: url('/images/rootcarving2.jpg'); background-size: cover; background-position: center;"></div>
    <div class="featured-content">
      <h3>禅意山水</h3>
      <p>作品以山水意境为主题，通过树根的天然纹理展现山峦起伏、水流婉转的自然之美，传达出东方美学中"天人合一"的哲学思想。</p>
      <p>作者：李清泉</p>
      <p>创作时间：2022年</p>
    </div>
  </div>
</div>

<!-- 作品分类展示标题 - 参考Mac官网风格设计 -->
<div class="title-section">
  <h2 class="animated-title">
    <span class="title-text"><span>作</span><span>品</span><span>分</span><span>类</span><span>展</span><span>示</span></span>
    <span class="title-decoration"></span>
  </h2>
</div>

<div class="section categories">
  <h3 class="category-title">传统题材作品</h3>
  <div class="gallery-grid">
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/rootcarving3.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《松鹤延年》</h4>
    </div>
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/rootcarving4.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《福如东海》</h4>
    </div>
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/rootcarving5.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《寿比南山》</h4>
    </div>
  </div>
  
  <h3 class="category-title">现代创意作品</h3>
  <div class="gallery-grid">
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/rootcarving6.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《城市之光》</h4>
    </div>
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/person.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《数字时代》</h4>
    </div>
    <div class="gallery-item">
      <div class="gallery-thumbnail" style="background-image: url('/images/rootcarving1.jpg'); background-size: cover; background-position: center;"></div>
      <h4>《未来形态》</h4>
    </div>
  </div>
</div>

<style scoped>
/* Apple风格核心样式 */
:root {
  --primary-color: #1d1d1f;
  --secondary-color: #86868b;
  --background-color: #ffffff;
  --section-bg: #f5f5f7;
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --accent-color: #0066cc;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--primary-color);
  line-height: 1.6;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

/* 标题样式 */
h1 {
  font-size: 3.5rem;
  font-weight: 300;
  text-align: center;
  margin: 3rem 0 2rem;
  color: var(--primary-color);
  letter-spacing: -0.02em;
}

/* 动画标题样式 - Mac官网风格 */
.title-section {
  margin: 4rem 0 2rem;
  padding: 0 1rem;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: titleFadeIn 0.8s ease forwards;
}

.title-section:nth-of-type(1) { animation-delay: 0.2s; }
.title-section:nth-of-type(2) { animation-delay: 0.8s; }
.title-section:nth-of-type(3) { animation-delay: 1.4s; }

@keyframes titleFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-title {
  font-size: 2.8rem;
  font-weight: 300;
  position: relative;
  display: inline-block;
  color: var(--primary-color);
  letter-spacing: -0.02em;
  margin: 0;
  padding-bottom: 1rem;
  cursor: default;
  transition: transform 0.3s ease;
}

.animated-title:hover {
  transform: translateY(-3px);
}

.title-text {
  display: inline-block;
  position: relative;
  z-index: 2;
  transition: color 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.animated-title:hover .title-text {
  color: var(--accent-color);
}

.title-decoration {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transform: translateX(-50%);
  transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.animated-title:hover .title-decoration {
  width: 100%;
}

/* 标题文字微动画效果 */
.title-text span {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
  animation: letterFadeIn 0.5s ease forwards;
}

/* 为每个字符设置不同的延迟，创造打字机效果 */
.title-text span:nth-child(1) { animation-delay: 0.1s; }
.title-text span:nth-child(2) { animation-delay: 0.2s; }
.title-text span:nth-child(3) { animation-delay: 0.3s; }
.title-text span:nth-child(4) { animation-delay: 0.4s; }
.title-text span:nth-child(5) { animation-delay: 0.5s; }
.title-text span:nth-child(6) { animation-delay: 0.6s; }
.title-text span:nth-child(7) { animation-delay: 0.7s; }
.title-text span:nth-child(8) { animation-delay: 0.8s; }

@keyframes letterFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h3 {
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--primary-color);
  letter-spacing: -0.01em;
}

h4 {
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--primary-color);
  margin: 0;
}

p {
  font-size: 1rem;
  color: var(--secondary-color);
  margin: 0.5rem 0;
}

/* 区块样式 */
.section {
  margin: 3rem auto;
  padding: 2.5rem;
  background-color: var(--section-bg);
  border-radius: var(--border-radius);
  max-width: 1200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 为不同区块添加延迟动画，创造层次感 */
.section:nth-child(1) { animation-delay: 0.1s; }
.section:nth-child(2) { animation-delay: 0.3s; }
.section:nth-child(3) { animation-delay: 0.5s; }

.section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

/* 视频区域 */
.video-container {
  width: 100%;
  height: 320px;
  background-color: #1d1d1f;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.video-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
  transition: opacity 0.3s ease;
}

.video-container::after {
  content: '▶';
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
}

.video-container:hover {
  transform: scale(1.01);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.video-container:hover::after {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* 轮播区域 */
.featured-item {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

.featured-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.featured-image {
  width: 100%;
  height: 300px;
  background-color: #e3e3e3;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.featured-item:hover .featured-image {
  transform: scale(1.03);
}

.featured-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.featured-item:hover .featured-image::after {
  opacity: 1;
}

.featured-content {
  padding: 2rem;
  text-align: center;
  transition: transform 0.4s ease;
}

.featured-item:hover .featured-content {
  transform: translateY(-5px);
}

.featured-content h3 {
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.featured-item:hover .featured-content h3 {
  color: var(--accent-color);
}

/* 分类展示 */
.category-title {
  margin: 0 0 1.8rem;
  text-align: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e3e3e3;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.gallery-item {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  position: relative;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.gallery-item:hover .gallery-thumbnail {
  transform: scale(1.05);
}

.gallery-thumbnail {
  width: 100%;
  height: 220px;
  background-color: #e3e3e3;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease, filter 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 图片加载动画 */
.gallery-thumbnail::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.gallery-item:hover .gallery-thumbnail {
  transform: scale(1.05);
  filter: brightness(1.05);
}

.gallery-item h4 {
  padding: 1.2rem;
  text-align: center;
  background-color: white;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease, transform 0.3s ease;
}

.gallery-item:hover h4 {
  color: var(--accent-color);
  transform: translateY(-3px);
}

/* 添加轻微的页面滚动效果 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* 平滑滚动辅助类 */
html {
  scroll-behavior: smooth;
}

/* 为可点击元素添加统一的交互效果 */
[role="button"],
button,
a,
.video-container {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* 触摸设备的优化 */
@media (hover: none) {
  .gallery-item:hover .gallery-thumbnail,
  .featured-item:hover .featured-image {
    transform: none;
  }
  
  .section:hover,
  .featured-item:hover {
    transform: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 2.8rem;
    margin: 2rem 0 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1.2rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  .section {
    padding: 1.8rem;
    margin: 2rem auto;
    border-radius: 8px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .featured-image {
    height: 250px;
  }
  
  .gallery-thumbnail {
    height: 180px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2.2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .section {
    padding: 1.5rem;
  }
  
  .featured-content {
    padding: 1.5rem;
  }
}
</style>