<template>
  <div class="form-step">
    <div class="form-header">
      <div class="otp-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </div>
      <h1>Verificación 2FA</h1>
      <p>Ingresa el código de 6 dígitos enviado a <strong>{{ maskedEmail }}</strong></p>
    </div>

    <div class="otp-container">
      <input
        v-for="(_, i) in 6"
        :key="i"
        :ref="el => emit('update:otpRefs', el, i)"
        v-model="localOtp[i]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="otp-input"
        :class="{ filled: localOtp[i], error: otpError }"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
        @paste="onPaste($event)"
      />
    </div>

    <div v-if="otpError" class="error-msg animate-fadeIn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ otpError }}
    </div>

    <div class="otp-timer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <span v-if="timer > 0">El código expira en <strong>{{ timerFormatted }}</strong></span>
      <button v-else class="resend-btn" @click="$emit('resend')">Reenviar código</button>
    </div>

    <button class="btn-primary w-full mt-4" @click="$emit('verify')" :disabled="isLoading || !otpFull">
      <span v-if="isLoading" class="spinner"></span>
      <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {{ isLoading ? 'Verificando...' : 'Verificar acceso' }}
    </button>

    <button class="back-btn" @click="$emit('back')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Volver al login
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  maskedEmail: { type: String, required: true },
  otp: { type: Array, required: true },
  otpRefs: { type: Array, required: true },
  timer: { type: Number, required: true },
  timerFormatted: { type: String, required: true },
  otpFull: { type: Boolean, required: true },
  isLoading: { type: Boolean, required: true },
  otpError: { type: String, default: '' }
})

const emit = defineEmits(['verify', 'resend', 'back', 'update:otpRefs', 'update:otp'])

const localOtp = ref([...props.otp])

watch(() => props.otp, (newVal) => {
  localOtp.value = [...newVal]
}, { deep: true })

watch(localOtp, (newVal) => {
  emit('update:otp', [...newVal])
}, { deep: true })

const onInput = (i, e) => {
  const val = e.target.value.replace(/\D/g, '')
  localOtp.value[i] = val.slice(-1)
  if (val && i < 5) {
    nextTick(() => props.otpRefs[i + 1]?.focus())
  }
  if (localOtp.value.every(d => d !== '')) {
    emit('verify')
  }
}

const onKeydown = (i, e) => {
  if (e.key === 'Backspace' && !localOtp.value[i] && i > 0) {
    nextTick(() => props.otpRefs[i - 1]?.focus())
  }
}

const onPaste = (e) => {
  e.preventDefault()
  const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  paste.split('').forEach((c, i) => { localOtp.value[i] = c })
  nextTick(() => {
    const next = Math.min(paste.length, 5)
    props.otpRefs[next]?.focus()
  })
}
</script>