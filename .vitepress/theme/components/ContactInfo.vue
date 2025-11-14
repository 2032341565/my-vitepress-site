<template>
  <div class="contact-info-container">
    <h3>关于根艺馆的联系方式</h3>
    <div class="contact-details">
      <div class="contact-item">
        <span class="contact-icon">📍</span>
        <div>
          <strong>联系地址：</strong>
          <span>{{ address }}</span>
        </div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">📞</span>
        <div>
          <strong>联系电话：</strong>
          <a :href="'tel:' + phone">{{ phone }}</a>
        </div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">✉️</span>
        <div>
          <strong>电子邮箱：</strong>
          <a :href="'mailto:' + email">{{ email }}</a>
        </div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">⏰</span>
        <div>
          <strong>开放时间：</strong>
          <span>{{ openingHours }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  data() {
    return {
      address: '中国福建省福州市仓山区根雕艺术文化园',
      phone: '0591-12345678',
      email: 'info@gendiao-art.com',
      openingHours: '周二至周日 9:00-17:00（周一闭馆）'
    }
  }
}
</script>

<style scoped>
.contact-info-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(139, 69, 19, 0.08);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-item div {
  flex: 1;
}

.contact-item a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-item a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>