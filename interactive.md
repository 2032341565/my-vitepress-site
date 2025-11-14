---
title: 互动专区
description: 与根雕艺术近距离接触，分享您的想法与建议
---

<!-- Mac风格主标题 -->
<div class="interactive-hero">
  <h1 class="mac-title">
    <span class="title-text">互动专区</span>
    <span class="title-subtitle">与根雕艺术近距离接触，分享您的想法与建议</span>
  </h1>
  <div class="title-divider"></div>
</div>

<CommentSection 
  section-title="留言专区"
  section-description="在这里，您可以分享自己看到的手工根艺品，也可以对根雕的新发展提出建议。"
/>

<ContactSection 
  section-title="联系我们"
  section-description="关于根艺馆的联系方式和地址"
  :contact-items="[
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
  ]"
/>

<style>
/* Mac风格主标题样式 - 仅保留页面特定样式 */
.interactive-hero {
  text-align: center;
  margin: 3rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

.mac-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 300;
  font-size: 3rem;
  margin: 0;
  letter-spacing: -0.5px;
  color: var(--vp-c-text-1);
}

.title-text {
  display: block;
  line-height: 1.2;
}

.title-subtitle {
  display: block;
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  letter-spacing: normal;
}

.title-divider {
  width: 100px;
  height: 2px;
  background-color: var(--vp-c-brand);
  margin: 1.5rem auto 0;
  border-radius: 1px;
  transform: scaleX(0);
  animation: scaleIn 0.6s ease forwards 0.4s;
}

/* 页面特定动画效果 */
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

@keyframes scaleIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* 页面特定响应式设计 */
@media (max-width: 1024px) {
  .mac-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .interactive-hero {
    margin: 2rem 0;
  }
  .mac-title {
    font-size: 2rem;
  }
  .title-subtitle {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .mac-title {
    font-size: 1.75rem;
  }
  .title-subtitle {
    font-size: 1rem;
  }
}
</style>