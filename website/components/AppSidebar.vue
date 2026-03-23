<template>
  <aside class="sidebar glass">
    <div class="sidebar-logo">
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.3)" stroke-width="1"/>
        <path d="M10 12h6M10 18h10M10 24h8" stroke="#00e5ff" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="26" cy="12" r="3" fill="#00e5ff" opacity="0.9"/>
        <circle cx="26" cy="24" r="3" fill="#ff4757" opacity="0.9"/>
        <path d="M24 18h4" stroke="#ffb800" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <span class="sidebar-brand">Commit<span class="accent">Check</span></span>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Principal</div>
      <button
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="$emit('update:activeNav', item.id)"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </button>

      <div class="nav-section-label mt">Análisis</div>
      <button
        v-for="item in navAnalysis"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="$emit('update:activeNav', item.id)"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar-user">
      <div class="user-avatar">JD</div>
      <div class="user-info">
        <span class="user-name">Juan Dev</span>
        <span class="user-role">Senior Developer</span>
      </div>
      <button class="logout-btn" @click="$emit('logout')" title="Cerrar sesión">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  activeNav: { type: String, required: true },
  navItems: { type: Array, required: true },
  navAnalysis: { type: Array, required: true }
})

defineEmits(['update:activeNav', 'logout'])
</script>