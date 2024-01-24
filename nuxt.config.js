// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@formkit/auto-animate",
    "@pinia/nuxt",
  ],
  // server: {
  //   proxy: {
  //     '/api': 'http:localhost:3000',
  //   },
  // },
  aliases: {
    nuxt: "logos:nuxt-icon",
  },
});
