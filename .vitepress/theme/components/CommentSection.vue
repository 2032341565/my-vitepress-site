<template>
  <div class="comment-section">
    <!-- 留言专区 -->
    <div class="section-header">
      <h2 class="section-title">
        <span class="section-text">{{ sectionTitle }}</span>
        <span class="section-divider"></span>
      </h2>
      <p class="section-description">{{ sectionDescription }}</p>
    </div>

    <!-- 留言表单 -->
    <form class="comment-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">{{ nameLabel }}</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name"
          :placeholder="namePlaceholder"
        >
      </div>
      <div class="form-group">
        <label for="comment">{{ commentLabel }}</label>
        <textarea 
          id="comment" 
          rows="5" 
          v-model="formData.comment"
          :placeholder="commentPlaceholder"
        ></textarea>
      </div>
      <button type="submit" class="submit-button">
        <span class="button-text">{{ submitButtonText }}</span>
        <span class="button-indicator"></span>
      </button>
    </form>

    <!-- 最新留言 -->
    <div class="section-header">
      <h2 class="section-title">
        <span class="section-text">{{ latestCommentsTitle }}</span>
        <span class="section-divider"></span>
      </h2>
    </div>

    <!-- 留言列表 -->
    <div class="comments-list">
      <div 
        v-for="(comment, index) in comments" 
        :key="index"
        class="comment-card"
      >
        <div class="comment-header">
          <span class="comment-author">{{ comment.author }}</span>
          <span class="comment-date">{{ comment.date }}</span>
        </div>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentSection',
  props: {
    sectionTitle: {
      type: String,
      default: '留言专区'
    },
    sectionDescription: {
      type: String,
      default: '在这里，您可以分享自己看到的手工根艺品，也可以对根雕的新发展提出建议。'
    },
    nameLabel: {
      type: String,
      default: '您的名字'
    },
    namePlaceholder: {
      type: String,
      default: '请输入您的名字'
    },
    commentLabel: {
      type: String,
      default: '留言内容'
    },
    commentPlaceholder: {
      type: String,
      default: '分享您的想法...'
    },
    submitButtonText: {
      type: String,
      default: '提交留言'
    },
    latestCommentsTitle: {
      type: String,
      default: '最新留言'
    },
    comments: {
      type: Array,
      default: () => [
        {
          author: '张先生',
          date: '2023-10-15',
          content: '根雕艺术真是博大精深，希望能有更多机会学习这门传统技艺。'
        },
        {
          author: '李女士',
          date: '2023-10-12',
          content: '建议可以举办一些亲子活动，让更多小朋友了解根雕文化。'
        }
      ]
    }
  },
  data() {
    return {
      formData: {
        name: '',
        comment: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // 表单提交处理逻辑
      if (this.formData.name && this.formData.comment) {
        // 实际项目中这里会发送请求到服务器
        console.log('提交留言:', this.formData);
        
        // 重置表单
        this.formData.name = '';
        this.formData.comment = '';
        
        // 显示成功提示（实际项目中可以使用更友好的提示方式）
        alert('留言提交成功！');
      } else {
        alert('请填写完整信息');
      }
    }
  }
}
</script>

<style scoped>
.comment-section {
  margin: 2rem 0;
}

/* 区块标题样式 */
.section-header {
  margin: 3rem 0 2rem;
  opacity: 0;
  transform: translateY(15px);
  animation: fadeInUp 0.6s ease forwards;
}

.section-header:nth-of-type(1) {
  animation-delay: 0.6s;
}

.section-header:nth-of-type(2) {
  animation-delay: 0.8s;
}

.section-title {
  display: flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  margin: 0 0 0.75rem;
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
  margin: 0;
  line-height: 1.6;
}

/* 表单样式 */
.comment-form {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comment-form:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
}

/* 提交按钮样式 */
.submit-button {
  padding: 1rem 2.5rem;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.4s ease;
}

.submit-button:hover {
  background-color: #0063d1;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 113, 227, 0.4);
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:active {
  transform: translateY(0);
  box-shadow: 0 3px 9px rgba(0, 113, 227, 0.3);
}

.submit-button:focus {
  outline: none;
  box-shadow: 
    0 0 0 3px rgba(0, 113, 227, 0.4),
    0 4px 12px rgba(0, 113, 227, 0.3);
  transform: translateY(-1px);
}

.submit-button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.button-text {
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
}

.button-indicator {
  width: 18px;
  height: 18px;
  position: relative;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* 留言列表样式 */
.comments-list {
  margin-top: 1rem;
}

.comment-card {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.comment-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
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

/* 响应式设计 */
@media (max-width: 1024px) {
  .section-title {
    font-size: 1.75rem;
  }
  .submit-button {
    padding: 0.9rem 2.25rem;
    font-size: 1rem;
    min-width: 140px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
  .section-divider {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
  .comment-form,
  .comment-card {
    padding: 1.25rem;
    margin: 1.5rem 0;
  }
  .submit-button {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
    min-width: 120px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.375rem;
  }
  .section-description {
    font-size: 1rem;
  }
  .submit-button {
    padding: 0.8rem 1.75rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }
}
</style>