<template>
  <div class="step-indicator">
    <div class="step" :class="{ active: step >= 1, done: step > 1 }">
      <span class="step-num">{{ step > 1 ? '✓' : '01' }}</span>
      <span class="step-label">Credenciales</span>
    </div>
    <div class="step-line" :class="{ active: step > 1 }"></div>
    <div class="step" :class="{ active: step >= 2, done: step > 2 }">
      <span class="step-num">{{ step > 2 ? '✓' : '02' }}</span>
      <span class="step-label">Verificación</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  step: {
    type: Number,
    required: true
  }
})
</script>