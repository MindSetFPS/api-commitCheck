<template>
  <div class="score-display">
    <svg class="score-ring" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-base)" stroke-width="8"/>
      <circle
        cx="60" cy="60" r="50"
        fill="none"
        :stroke="scoreColor"
        stroke-width="8"
        stroke-linecap="round"
        stroke-dasharray="314"
        :stroke-dashoffset="314 - (314 * score / 100)"
        transform="rotate(-90 60 60)"
        style="transition: stroke-dashoffset 0.8s ease"
      />
    </svg>
    <div class="score-inner">
      <span class="score-num" :style="`color: ${scoreColor}`">
        {{ score }}
      </span>
      <span class="score-label">Riesgo</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, required: true },
  scoreColor: { type: String, required: true }
})
</script>