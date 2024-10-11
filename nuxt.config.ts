// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  plugins: ['~/plugins/auth.js'],
  pwa: {
    manifest: {
      name: 'Inventory Log Form',
      short_name: 'ILF',
      description: 'Inventory Log Form',
      theme_color: '#22325D',
      background_color: '#22325D',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-large.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      // globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
    },
    client: {
      installPrompt: true
    }
  },
  supabase: {
    redirect: false,
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
