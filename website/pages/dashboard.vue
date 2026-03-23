<template>
  <div class="dashboard-wrapper noise-bg">
    <div class="bg-grid" aria-hidden="true"></div>

    <AppSidebar
      :active-nav="activeNav"
      :nav-items="navItems"
      :nav-analysis="navAnalysis"
      @update:activeNav="activeNav = $event"
      @logout="handleLogout"
    />

    <main class="main-content">
      <AppTopbar :current-page-title="currentPageTitle" :active-nav="activeNav" />

      <section class="stats-row">
        <StatCard
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-bind="stat"
          :animation-delay="i * 0.06"
        />
      </section>

      <div class="content-grid">
        <CommitList
          :commits="filteredCommits"
          :risk-labels="riskLabels"
          :risk-color="riskColor"
          v-model:search-query="searchQuery"
          v-model:risk-filter="riskFilter"
          :selected-commit="selectedCommit"
          @select="selectCommit"
        />

        <AnalysisPanel
          :selected-commit="selectedCommit"
          :risk-color="riskColor"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

import { useDashboard } from '~/composables/useDashboard.js'
import AppSidebar from '~/components/AppSidebar.vue'
import AppTopbar from '~/components/AppTopbar.vue'
import StatCard from '~/components/StatCard.vue'
import CommitList from '~/components/CommitList.vue'
import AnalysisPanel from '~/components/AnalysisPanel.vue'

const {
  activeNav, searchQuery, riskFilter, selectedCommit,
  riskLabels, navItems, navAnalysis, stats,
  currentPageTitle, filteredCommits,
  riskColor, selectCommit, handleLogout,
} = useDashboard()
</script>

<style>
@import '~/assets/dashboard.css';
</style>