<template>
  <section class="commits-section">
    <div class="section-header">
      <h3>Commits Recientes</h3>
      <div class="section-actions">
        <div class="search-bar">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)" placeholder="Buscar commit..." class="search-input" />
        </div>
        <select :value="riskFilter" @change="$emit('update:riskFilter', $event.target.value)" class="filter-select">
          <option value="">Todo</option>
          <option value="low">Bajo riesgo</option>
          <option value="medium">Riesgo medio</option>
          <option value="high">Alto riesgo</option>
        </select>
      </div>
    </div>

    <div class="commits-list">
      <CommitRow
        v-for="(commit, i) in commits"
        :key="commit.hash"
        v-bind="commit"
        :risk-label="riskLabels[commit.risk]"
        :score-color="riskColor(commit.score)"
        :selected="selectedCommit?.hash === commit.hash"
        :animation-delay="i * 0.04"
        @click="$emit('select', commit)"
      />
    </div>
  </section>
</template>

<script setup>
import CommitRow from './CommitRow.vue'

defineProps({
  commits: { type: Array, required: true },
  riskLabels: { type: Object, required: true },
  riskColor: { type: Function, required: true },
  searchQuery: { type: String, required: true },
  riskFilter: { type: String, required: true },
  selectedCommit: { type: Object, default: null }
})

defineEmits(['update:searchQuery', 'update:riskFilter', 'select'])
</script>