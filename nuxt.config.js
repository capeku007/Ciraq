// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@formkit/auto-animate",
    "@pinia/nuxt",
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  aliases: {
    nuxt: "logos:nuxt-icon",
  },
});
