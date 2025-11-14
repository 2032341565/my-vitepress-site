<template>
  <div class="comment-container">
    <h3 class="comment-title">评论区</h3>
    
    <!-- 自定义提示组件 -->
    <div 
      v-if="notification.visible" 
      :class="['notification', notification.type]"
    >
      <span class="notification-icon">{{ notification.type === 'success' ? '✓' : '!' }}</span>
      <span class="notification-message">{{ notification.message }}</span>
      <button class="notification-close" @click="hideNotification">&times;</button>
    </div>
    
    <!-- 评论表单 -->
    <div class="comment-form">
      <div class="form-group">
        <label for="nickname">昵称</label>
        <input 
          id="nickname" 
          v-model="nickname" 
          type="text" 
          placeholder="请输入昵称"
          :class="{ 'error': errors.nickname }"
        >
        <span v-if="errors.nickname" class="error-msg">{{ errors.nickname }}</span>
      </div>
      
      <div class="form-group">
        <label for="email">邮箱（选填）</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          placeholder="请输入邮箱"
        >
      </div>
      
      <div class="form-group">
        <label for="content">评论内容</label>
        <textarea 
          id="content" 
          v-model="content" 
          rows="4" 
          placeholder="欢迎分享您的想法..."
          :class="{ 'error': errors.content }"
        ></textarea>
        <span v-if="errors.content" class="error-msg">{{ errors.content }}</span>
      </div>
      
      <button 
        class="submit-btn" 
        @click="submitComment"
        :disabled="submitting"
      >
        {{ submitting ? '提交中...' : '发表评论' }}
      </button>
    </div>
    
    <!-- 评论列表 -->
    <div class="comment-list" v-if="comments.length > 0">
      <h4 class="comment-list-title">{{ comments.length }} 条评论</h4>
      <div 
        v-for="comment in comments" 
        :key="comment.objectId" 
        class="comment-item"
      >
        <div class="comment-header">
          <div class="user-avatar">
            {{ getAvatarText(comment.nickname) }}
          </div>
          <div class="user-info">
            <div class="nickname">{{ comment.nickname }}</div>
            <div class="comment-time">{{ formatDate(comment.createdAt) }}</div>
          </div>
        </div>
        <div class="comment-body">
          {{ comment.content }}
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="no-comments">
      暂无评论，快来发表第一条评论吧！
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      加载评论中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 表单数据
const nickname = ref('')
const email = ref('')
const content = ref('')

// 状态管理
const comments = ref([])
const loading = ref(false)
const submitting = ref(false)
const errors = ref({})
const commentQuery = ref(null)
const notification = ref({
  visible: false,
  type: 'success', // success 或 error
  message: ''
})

// 配置
const APP_ID = 'E04tnfFOaR0e3TyknitZikVb-gzGzoHsz'
const APP_KEY = 'i6VMzinoSGt5HndpLu700gE4'

// 初始化LeanCloud
let AV = null
const initLeanCloud = async () => {
  if (typeof window !== 'undefined') {
    // 确保AV变量已被赋值
    if (!AV) {
      // 使用动态导入
      const leancloudStorage = await import('leancloud-storage')
      AV = leancloudStorage.default
    }
    
    // 检查全局初始化状态
    if (!window._leancloudInitialized) {
      try {
        // 尝试初始化，捕获"SDK is already initialized"错误
        AV.init({
          appId: APP_ID,
          appKey: APP_KEY,
          serverURLs: 'https://e04tnffo.lc-cn-n1-shared.com'
        })
        
        // 标记为已初始化
        window._leancloudInitialized = true
      } catch (error) {
        // 如果是"SDK is already initialized"错误，忽略它
        if (error.message && !error.message.includes('SDK is already initialized')) {
          console.error('LeanCloud初始化失败:', error)
          throw error
        } else {
          // 确保状态被正确标记
          window._leancloudInitialized = true
        }
      }
    }
  }
}

// 获取评论
const fetchComments = async () => {
  if (typeof window === 'undefined') return
  
  try {
    loading.value = true
    errors.value = {}
    
    // 确保AV已初始化
    if (!AV) {
      await initLeanCloud()
    }
    
    // 获取当前页面路径作为查询条件
    const pagePath = window.location.pathname
    
    // 创建查询
    const Comment = AV.Object.extend('Comment')
    commentQuery.value = new AV.Query(Comment)
    commentQuery.value.equalTo('path', pagePath)
    commentQuery.value.descending('createdAt')
    
    // 执行查询
    const results = await commentQuery.value.find()
    
    // 转换为我们需要的格式
    comments.value = results.map(result => ({
      objectId: result.id,
      nickname: result.get('nickname'),
      email: result.get('email') || '',
      content: result.get('content'),
      createdAt: result.get('createdAt')
    }))
  } catch (error) {
    console.error('获取评论失败:', error)
    // 重置comments数组，避免显示旧数据
    comments.value = []
  } finally {
    loading.value = false
  }
}

// 验证表单
const validateForm = () => {
  let isValid = true
  errors.value = {}
  
  if (!nickname.value.trim()) {
    errors.value.nickname = '昵称不能为空'
    isValid = false
  }
  
  if (!content.value.trim()) {
    errors.value.content = '评论内容不能为空'
    isValid = false
  } else if (content.value.trim().length < 5) {
    errors.value.content = '评论内容至少需要5个字符'
    isValid = false
  }
  
  if (email.value.trim() && !validateEmail(email.value)) {
    errors.value.email = '请输入有效的邮箱地址'
    isValid = false
  }
  
  return isValid
}

// 验证邮箱
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 显示通知
const showNotification = (type, message) => {
  notification.value = {
    visible: true,
    type,
    message
  }
  
  // 3秒后自动隐藏
  setTimeout(() => {
    hideNotification()
  }, 3000)
}

// 隐藏通知
const hideNotification = () => {
  notification.value.visible = false
}

// 提交评论
const submitComment = async () => {
  if (!validateForm()) return
  
  try {
    submitting.value = true
    
    // 确保AV已初始化
    if (!AV) {
      await initLeanCloud()
    }
    
    // 创建评论对象
    const Comment = AV.Object.extend('Comment')
    const comment = new Comment()
    
    // 设置属性
    comment.set('nickname', nickname.value.trim())
    comment.set('email', email.value.trim())
    comment.set('content', content.value.trim())
    comment.set('path', window.location.pathname)
    
    // 保存到LeanCloud
    await comment.save()
    
    // 重置表单
    content.value = ''
    
    // 重新获取评论列表
    await fetchComments()
    
    // 显示成功提示
    showNotification('success', '评论发表成功！')
  } catch (error) {
    console.error('提交评论失败:', error)
    showNotification('error', '评论发表失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())} ${padZero(d.getHours())}:${padZero(d.getMinutes())}`
}

// 补零函数
const padZero = (num) => {
  return num < 10 ? `0${num}` : num
}

// 获取头像文字（昵称首字母）
const getAvatarText = (nickname) => {
  if (!nickname) return 'U'
  return nickname.charAt(0).toUpperCase()
}

// 生命周期
const loadComments = async () => {
  if (typeof window !== 'undefined') {
    // 初始化并获取评论
    await initLeanCloud()
    await fetchComments()
  }
}

onMounted(() => {
  loadComments()
  
  // 监听路由变化，VitePress使用history模式
  const handleRouteChange = () => {
    // 延迟执行确保页面已经更新
    setTimeout(() => {
      loadComments()
    }, 100)
  }
  
  // 监听popstate事件（浏览器前进/后退）
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', handleRouteChange)
    
    // 保存事件监听器引用以便后续清理
    window._leancloudCommentRouteListener = handleRouteChange
  }
})

onUnmounted(() => {
  // 清理查询
  if (commentQuery.value) {
    commentQuery.value = null
  }
  
  // 移除事件监听
  if (typeof window !== 'undefined' && window._leancloudCommentRouteListener) {
    window.removeEventListener('popstate', window._leancloudCommentRouteListener)
    window._leancloudCommentRouteListener = null
  }
})

// 在组件更新时也重新加载评论，以确保路由切换后数据正确
import { watch } from 'vue'

// 监听当前页面路径变化
watch(() => {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return ''
}, () => {
  loadComments()
})
</script>

<style scoped>
.comment-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin: 30px 0;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.comment-title {
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 24px;
  font-weight: 600;
}

.comment-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.comment-form {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-sizing: border-box;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  transition: all 0.3s ease;
  resize: none;
  box-sizing: border-box;
  max-width: 100%;
}

.form-group input {
  height: 44px;
}

.form-group textarea {
  min-height: 120px;
  line-height: 1.5;
  padding-top: 14px;
  padding-bottom: 14px;
}

.form-group input:hover,
.form-group textarea:hover {
  border-color: var(--vp-c-brand-1);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.2);
  transform: translateY(-1px);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff4d4f;
}

.error-msg {
  color: #ff4d4f;
  font-size: 12px;
  display: block;
  margin-top: 4px;
}

.submit-btn {
  background-color: #e2b36b;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #d4a76a;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.comment-list-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2b36b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 12px;
}

.user-info {
  flex: 1;
}

.nickname {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-body {
  color: #555;
  line-height: 1.6;
  word-break: break-word;
}

.no-comments {
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 14px;
}

.loading {
  text-align: center;
  color: #999;
  padding: 20px 0;
  font-size: 14px;
}

/* 自定义通知样式 - 水平居中垂直偏上的toast */
.notification {
  position: fixed;
  top: 20%; /* 调整为屏幕上方20%的位置 */
  left: 50%;
  transform: translateX(-50%);
  min-width: 280px;
  max-width: 400px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.notification.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #389e0d;
}

.notification.error {
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  color: #cf1322;
}

.notification-icon {
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: currentColor;
  color: white;
}

.notification-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
}

.notification-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: opacity 0.2s, background-color 0.2s;
  margin-left: 12px;
}

.notification-close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.08);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .comment-container {
    padding: 16px;
    margin: 20px 0;
  }
  
  .comment-form {
    padding: 16px;
  }
  
  .comment-title {
    font-size: 1.3rem;
  }
}
</style>