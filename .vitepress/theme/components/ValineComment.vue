<template>
  <div class="valine-container">
    <div id="valine-comments"></div>
  </div>
</template>

<script>
export default {
  name: 'ValineComment',
  data() {
    return {
      valineInstance: null
    }
  },
  mounted() {
    // 只在客户端环境中初始化Valine
    if (typeof window !== 'undefined') {
      // 动态导入Valine以避免服务端渲染错误
      import('valine').then(ValineModule => {
        const Valine = ValineModule.default
        
        // 初始化Valine评论系统
        // 注意：实际使用时需要替换为真实的appId和appKey（需要在LeanCloud注册）
        this.valineInstance = new Valine({
          el: '#valine-comments',
          appId: 'E04tnfFOaR0e3TyknitZikVb-gzGzoHsz', // 用户提供的真实appId
          appKey: 'i6VMzinoSGt5HndpLu700gE4', // 用户提供的真实appKey
          placeholder: '欢迎分享您看到的手工根艺品，也可以对根雕创新发展提出建议！',
          path: window.location.pathname,
          avatar: 'monsterid', // 头像风格
          meta: ['nick', 'mail', 'link'], // 自定义评论框字段
          pageSize: 10,
          lang: 'zh-CN',
          visitor: false, // 关闭访问统计
          enableQQ: false, // 关闭QQ登录
          recordIP: false, // 不记录IP
          requiredFields: ['nick'], // 必须填写昵称
          anonymous: '匿名', // 匿名评论时显示的名称
          avatarForce: false, // 不强制使用头像
          highlight: false // 不启用代码高亮
        })
      })
    }
  },
  beforeUnmount() {
    // 组件卸载时清理实例
    if (this.valineInstance) {
      // Valine实例没有destroy方法，直接移除DOM元素并清空实例
      const commentElement = document.getElementById('valine-comments')
      if (commentElement) {
        commentElement.innerHTML = ''
      }
      this.valineInstance = null
    }
  }
}
</script>

<style scoped>
.valine-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 30px 0;
  transition: all 0.3s ease;
}

.valine-container:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

/* 评论输入区域美化 */
:deep(.vinput) {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
  font-size: 14px;
  background-color: #fafafa;
}

:deep(.vinput:focus) {
  border-color: var(--vp-c-brand-1);
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* 按钮美化 */
:deep(.vbtn) {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  transform: translateY(0);
}

:deep(.vbtn:hover) {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

:deep(.vbtn:active) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
}

/* 评论卡片美化 */
:deep(.vcard) {
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

:deep(.vcard:hover) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* 头像美化 */
:deep(.vimg) {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

:deep(.vcard:hover .vimg) {
  border-color: var(--vp-c-brand-1);
  transform: scale(1.05);
}

/* 评论者信息 */
:deep(.vhead) {
  margin-bottom: 12px;
}

:deep(.vnick) {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  margin-left: 12px;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

:deep(.vnick:hover) {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

/* 评论内容 */
:deep(.vcontent) {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  font-size: 15px;
  padding: 10px 0;
  border-radius: 6px;
  background-color: #fafafa;
  padding: 15px;
}

/* 时间和操作按钮 */
:deep(.vmeta) {
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin-top: 10px;
}

:deep(.vat) {
  color: var(--vp-c-text-3);
  text-decoration: none;
  margin-left: 15px;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

:deep(.vat:hover) {
  color: var(--vp-c-brand-1);
  background-color: rgba(79, 70, 229, 0.1);
}

/* 分页样式 */
:deep(.vpage) {
  margin-top: 20px;
  text-align: center;
}

:deep(.vpage a) {
  display: inline-block;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 6px;
  background-color: #f0f0f0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.3s ease;
}

:deep(.vpage a:hover) {
  background-color: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
}

:deep(.vpage .on) {
  background-color: var(--vp-c-brand-1);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .valine-container {
    padding: 16px;
    margin: 20px 0;
  }
  
  :deep(.vcard) {
    padding: 16px;
  }
  
  :deep(.vimg) {
    width: 40px;
    height: 40px;
  }
  
  :deep(.vnick) {
    font-size: 14px;
  }
  
  :deep(.vcontent) {
    font-size: 14px;
    padding: 12px;
  }
  
  :deep(.vbtn) {
    padding: 6px 16px;
  }
}

/* 滚动条美化（针对WebKit浏览器） */
:deep(.vcontent::-webkit-scrollbar) {
  width: 6px;
}

:deep(.vcontent::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 3px;
}

:deep(.vcontent::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 3px;
}

:deep(.vcontent::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}

/* 加载动画 */
:deep(.vloading) {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

/* 暂无评论提示 */
:deep(.vno-comment) {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

/* 评论输入框聚焦效果 */
:deep(.veditor:focus-within) {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* 隐藏Powered By Valine信息 */
:deep(.vpower) {
  display: none !important;
}

/* 隐藏版本号 */
:deep(.vbtn[data-type="submit"]:after) {
  content: none !important;
}

/* 确保所有可能的底部信息都被隐藏 */
:deep(.vheader),
:deep(.vfooter),
:deep(.vstatus) {
  position: relative;
}

/* 隐藏任何可能出现的版本信息文本 */
:deep(*)[class*="version"],
:deep(*):contains("Powered By"),
:deep(*):contains("v1.5.2") {
  display: none !important;
}

/* 隐藏M图标（可能是Markdown或其他功能图标） */
:deep(.vheader .vat[data-type="markdown"]),
:deep(.vheader .vm),
:deep(.vheader i[class*="icon"]),
:deep(.vheader [class*="markdown"]),
:deep(.vbtn[data-type="markdown"]),
:deep(.vat[data-type="markdown"]) {
  display: none !important;
}

/* 隐藏浏览器和操作系统信息 */
:deep(.vagent),
:deep(.vmeta .vicon),
:deep(.vmeta [class*="browser"]),
:deep(.vmeta [class*="os"]),
:deep(.vmeta .vsep),
:deep(.vcard .vmeta span:not(:first-child)) {
  display: none !important;
}

/* 确保评论者信息和时间之间没有多余的分隔符 */
:deep(.vmeta) {
  line-height: 1.4;
}
</style>