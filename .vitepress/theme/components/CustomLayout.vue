<template>
  <div class="custom-layout">
    <header class="site-header" :class="{ scrolled: isScrolled }">
      <div class="header-content">
        <a href="/" class="site-logo">{{ siteData.title }}</a>
        <nav class="nav-menu">
          <div
            v-for="item in siteData.themeConfig.nav"
            :key="item.text"
            class="nav-item"
          >
            <a 
              :href="item.link" 
              :class="['nav-link', { active: isActive(item.link) }]"
            >
              {{ item.text }}
            </a>
          </div>
        </nav>
        <button class="menu-toggle" @click="toggleMenu">
          <span class="menu-icon">{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
      <!-- 移动端菜单 -->
      <div v-if="menuOpen" class="mobile-menu">
        <div
          v-for="item in siteData.themeConfig.nav"
          :key="item.text"
          class="mobile-nav-item"
        >
          <a 
            :href="item.link" 
            :class="['nav-link', { active: isActive(item.link) }]"
            @click="toggleMenu"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="site-main">
      <div class="main-content">
        <!-- 页面内容 -->
        <Content />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-logo">{{ siteData.title }}</div>
        <div class="footer-description">{{ siteData.description }}</div>
        <div class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} 中国非遗根雕文化传承中心
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import { Content } from 'vitepress'

const { site, page } = useData()
const siteData = computed(() => site.value)
const pageData = computed(() => page.value)
const isScrolled = ref(false)
const menuOpen = ref(false)

// 检查链接是否激活
const isActive = (link) => {
  const currentPath = pageData.value.relativePath || ''
  const normalizedPath = currentPath === 'index.md' ? '/' : `/${currentPath.replace('.md', '')}`
  // 首页特殊处理
  if (link === '/') {
    return normalizedPath === '/' || normalizedPath === '/index'
  }
  // 检查当前路径是否与链接匹配
  return normalizedPath === link || normalizedPath.startsWith(link + '/')
}

// 处理滚动效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 切换菜单
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.custom-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.site-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.site-header.scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 0;
  display: block;
}

.nav-link:hover,
.nav-link.active {
  color: #1890ff;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

/* 移动端菜单样式 */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  z-index: 999;
}

.mobile-nav-item {
  padding: 0 2rem;
}

.mobile-nav-item .nav-link {
  display: block;
  padding: 0.75rem 0;
  font-size: 1.1rem;
}

/* 主内容样式 */
.site-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.main-content {
  padding: 2rem;
  min-height: 60vh;
}

/* 页脚样式 */
.site-footer {
  background-color: #f5f5f5;
  border-top: 1px solid #e8e8e8;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.footer-description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.footer-copyright {
  color: #999;
  font-size: 0.85rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
  }
  
  .site-logo {
    font-size: 1.3rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>