export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    externals: {
      external: ['@prisma/client', '.prisma/client']
    }
  }
})