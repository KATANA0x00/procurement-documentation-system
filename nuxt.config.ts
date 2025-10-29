export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/icon"],
  
  runtimeConfig: {
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET || '',

    NUXT_LDAP_URL: process.env.NUXT_LDAP_URL || '',
    NUXT_LDAP_DC: process.env.NUXT_LDAP_DC || '',

    NUXT_PG_USER: process.env.NUXT_PG_USER || '',
    NUXT_PG_HOST: process.env.NUXT_PG_HOST || '',
    NUXT_PG_BASE: process.env.NUXT_PG_BASE || '',
    NUXT_PG_PASS: process.env.NUXT_PG_PASS || '',
    NUXT_NUXT_PG_PORT: Number(process.env.NUXT_NUXT_PG_PORT) || 5432,

    ON_PRODUCTION: process.env.ON_PRODUCTION,

    public: {
      dateDeploy: process.env.NUXT_PUBLIC_DATE_NOW
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' } // optional for iOS
      ]
    }
  }
})
