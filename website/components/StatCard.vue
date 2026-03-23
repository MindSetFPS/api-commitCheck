<template>
  <div class="stat-card glass animate-fadeInUp" :style="`animation-delay: ${animationDelay || 0}s`">
    <div class="stat-icon" :style="`background: ${iconBg}; color: ${iconColor}`" v-html="icon"></div>
    <div class="stat-body">
      <span class="stat-value">{{ value }}</span>
      <span class="stat-label">{{ label }}</span>
    </div>
    <div class="stat-trend" :class="trendUp ? 'up' : 'down'">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline :points="trendUp ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'"/>
      </svg>
      {{ trend }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
  iconBg: { type: String, required: true },
  iconColor: { type: String, required: true },
  trend: { type: String, required: true },
  trendUp: { type: Boolean, required: true },
  animationDelay: { type: Number, default: 0 }
})
</script>