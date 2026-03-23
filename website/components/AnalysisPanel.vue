<template>
  <aside class="analysis-panel">
    <div v-if="selectedCommit" class="panel-section glass animate-fadeIn">
      <div class="panel-header">
        <h4>Análisis del Commit</h4>
        <code class="commit-hash-lg">{{ selectedCommit.hash }}</code>
      </div>

      <ScoreDisplay :score="selectedCommit.score" :score-color="riskColor(selectedCommit.score)" />

      <CategoriesList :categories="selectedCommit.categories" :risk-color="riskColor" />
    </div>

    <div v-if="selectedCommit" class="panel-section glass animate-fadeIn delay-2">
      <div class="panel-header">
        <h4>Alertas detectadas</h4>
      </div>
      <WarningsList :warnings="selectedCommit.warnings" />
    </div>

    <div v-if="!selectedCommit" class="empty-panel glass">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
      <p>Selecciona un commit para ver su análisis detallado</p>
    </div>
  </aside>
</template>

<script setup>
import ScoreDisplay from './ScoreDisplay.vue'
import CategoriesList from './CategoriesList.vue'
import WarningsList from './WarningsList.vue'

defineProps({
  selectedCommit: { type: Object, default: null },
  riskColor: { type: Function, required: true }
})
</script>