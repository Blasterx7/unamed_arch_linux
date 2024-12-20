import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-file-storage',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@hypernym/nuxt-anime',
    '@nuxt/test-utils/module',
    'nuxt-openapi-docs-module',
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
         
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  tailwindcss: {
    config: {

    }
  },
  fileStorage: {
    mount: './public/uploads',
  },
  anime: {
    composables: true
  },
  spaLoadingTemplate: 'components/Loading.vue',
  components: [
    {
      global: true,
      path: '~/components',
      pathPrefix: false,
    },
  ],
  googleFonts: {
    families: {
      Roboto: true
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
