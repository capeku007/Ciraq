// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@formkit/auto-animate',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt'
  ],
  runtimeConfig:{
    authSecret: process.env.AUTH_SECRET,
  },
  aliases: {
    'nuxt': 'logos:nuxt-icon',
    
  },
  nuxtServerUtils:{
    appUrl:process.env.DATABASE_URI,
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
        type: 'authjs',
        baseURL: '/api/auth',
    },
    
}
})