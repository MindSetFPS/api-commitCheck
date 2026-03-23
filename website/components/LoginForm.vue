<template>
  <div class="form-step">
    <div class="form-header">
      <h1>Iniciar sesión</h1>
      <p>Accede a tu cuenta de CommitCheck</p>
    </div>

    <div class="form-group">
      <label class="form-label">Usuario / Email</label>
      <div class="input-wrapper">
        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <input
          v-model="credentials.email"
          type="text"
          class="input-field"
          placeholder="dev@empresa.com"
          @keydown.enter="$emit('login')"
          autocomplete="username"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">
        Contraseña
        <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
      </label>
      <div class="input-wrapper">
        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <input
          v-model="credentials.password"
          :type="showPw ? 'text' : 'password'"
          class="input-field"
          placeholder="••••••••••"
          @keydown.enter="$emit('login')"
          autocomplete="current-password"
        />
        <button class="pw-toggle" @click="$emit('update:showPw', !showPw)" type="button" :aria-label="showPw ? 'Ocultar' : 'Mostrar'">
          <svg v-if="!showPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="error" class="error-msg animate-fadeIn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ error }}
    </div>

    <button class="btn-primary w-full mt-4" @click="$emit('login')" :disabled="isLoading">
      <svg v-if="!isLoading" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      <span v-if="isLoading" class="spinner"></span>
      {{ isLoading ? 'Verificando...' : 'Continuar' }}
    </button>

    <div class="divider"><span>acceso seguro con 2FA</span></div>

    <SecurityBadges />
  </div>
</template>

<script setup>
import SecurityBadges from './SecurityBadges.vue'

const credentials = defineModel('credentials', { required: true })
const showPw = defineModel('showPw', { required: true })

defineProps({
  isLoading: { type: Boolean, required: true },
  error: { type: String, default: '' }
})

defineEmits(['login'])
</script>