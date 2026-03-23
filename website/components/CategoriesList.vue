<template>
  <div class="categories-list">
    <div v-for="cat in categories" :key="cat.name" class="category-item">
      <div class="cat-header">
        <div class="cat-left">
          <span class="cat-icon" v-html="cat.icon"></span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
        <span class="cat-score" :style="`color: ${riskColor(cat.score)}`">{{ cat.score }}/100</span>
      </div>
      <div class="cat-bar-bg">
        <div
          class="cat-bar-fill"
          :style="`width: ${cat.score}%; background: ${riskColor(cat.score)}`"
        ></div>
      </div>
      <p class="cat-desc">{{ cat.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  riskColor: { type: Function, required: true }
})
</script>