<template>
  <div class="commit-row glass animate-fadeInUp" 
       :style="`animation-delay: ${animationDelay || 0}s`"
       :class="{ selected: selected }"
       @click="$emit('click')">
    <div class="commit-left">
      <div class="commit-avatar" :style="`background: ${avatarColor}`">
        {{ author[0] }}
      </div>
      <div class="commit-info">
        <span class="commit-msg">{{ message }}</span>
        <div class="commit-meta">
          <code class="commit-hash">{{ hash }}</code>
          <span>{{ author }}</span>
          <span>{{ time }}</span>
        </div>
      </div>
    </div>
    <div class="commit-right">
      <div class="commit-stats">
        <span class="lines-added">+{{ added }}</span>
        <span class="lines-removed">-{{ removed }}</span>
      </div>
      <span class="risk-chip" :class="`risk-${risk}`">
        <span class="risk-dot"></span>
        {{ riskLabel }}
      </span>
      <div class="risk-score" :style="`color: ${scoreColor}`">
        {{ score }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hash: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  avatarColor: { type: String, required: true },
  time: { type: String, required: true },
  added: { type: Number, required: true },
  removed: { type: Number, required: true },
  risk: { type: String, required: true },
  riskLabel: { type: String, required: true },
  score: { type: Number, required: true },
  scoreColor: { type: String, required: true },
  selected: { type: Boolean, default: false },
  animationDelay: { type: Number, default: 0 }
})

defineEmits(['click'])
</script>