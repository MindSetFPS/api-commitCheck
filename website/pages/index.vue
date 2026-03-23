<template>
  <div class="login-wrapper noise-bg">
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>

    <div class="login-container">
      <LoginHeader />

      <div class="login-card glass animate-fadeInUp delay-1">
        <StepIndicator :step="step" />

        <Transition name="slide-step" mode="out-in">
          <LoginForm
            v-if="step === 1"
            key="step1"
            v-model:credentials="credentials"
            v-model:showPw="showPw"
            :is-loading="isLoading"
            :error="loginError"
            @login="handleLogin"
            @toggle-pw="showPw = !showPw"
          />
          <OtpForm
            v-else-if="step === 2"
            key="step2"
            v-model:otp="otp"
            v-model:otp-refs="otpRefs"
            :masked-email="maskedEmail"
            :timer="timer"
            :timer-formatted="timerFormatted"
            :otp-full="otpFull"
            :is-loading="isLoading"
            :otp-error="otpError"
            @verify="handleVerify"
            @resend="resendCode"
            @back="step = 1; otpError = ''; otp = Array(6).fill('')"
          />
        </Transition>
      </div>

      <div class="login-footer animate-fadeInUp delay-3">
        <span>CommitCheck v2.4.0</span>
        <span class="dot">·</span>
        <span>© 2025 Todos los derechos reservados</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

import { useLogin } from '~/composables/useLogin.js'
import LoginHeader from '~/components/LoginHeader.vue'
import StepIndicator from '~/components/StepIndicator.vue'
import LoginForm from '~/components/LoginForm.vue'
import OtpForm from '~/components/OtpForm.vue'

const {
  step, showPw, isLoading, loginError, otpError,
  credentials, otp, otpRefs, timer,
  maskedEmail, timerFormatted, otpFull,
  handleLogin, handleVerify,
  resendCode,
} = useLogin()
</script>

<style>
@import '~/assets/login.css';
</style>