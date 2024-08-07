// https://nuxt.com/docs/api/configuration/nuxt-config
const appName = 'Ciraq'
const appDescription = "You're in the right place"
export default defineNuxtConfig({
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
    ]
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@formkit/auto-animate",
    "@pinia/nuxt",
    '@vite-pwa/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  aliases: {
    nuxt: "logos:nuxt-icon",
  },
  plugins: ["~/plugins/vue3-toastify.js","~/plugins/indexedDB.js"],

  devServer: {
    port: 1738,
  },

  ssr: false,
  pwa: {
    scope: '/',
    base: '/',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    manifest: {
      name: appName,
      short_name: appName,
      description: appDescription,
      theme_color: "#1867c0",
      background_color: "#1867c0",
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    registerWebManifestInRouteRules: true,
    workbox: {
      navigateFallback: undefined,
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{json,ico,svg,ttf,woff,css,scss,js,html,txt,jpg,png,woff2,mjs,otf,ani}'],
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: 'NetworkFirst',
        },
        {
          urlPattern: /^https:\/\/api\.mapbox\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "mapbox-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: false,
      periodicSyncForUpdates: 604800, //seconds
    },
    devOptions: {
      enabled: true,
      suppressWarnings: false,
      navigateFallback: 'index.html',
      type: 'module',
    },
  },
  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  //future router when building employer side
  // router: {
  //   middleware: ['studentAuth'], // Global middleware for student side
  //   extendRoutes(routes, resolve) {
  //     // Extend routes for employer side with specific middleware
  //     routes.push({
  //       name: 'employer',
  //       path: '/employer/:path*',
  //       component: resolve(__dirname, 'pages/employer/_index.vue'),
  //       middleware: ['employerAuth']
  //     })
  //   }
  // }
});
