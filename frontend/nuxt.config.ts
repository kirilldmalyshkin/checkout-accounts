// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiBaseUri = process.env.API_URL || "http://localhost:1337";
console.log('strapiBaseUri', strapiBaseUri);

export default defineNuxtConfig({
  // @ts-ignore
  env: {
    strapiBaseUri,
  },
  routeRules: {
    '/': {  ssr: false },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: strapiBaseUri,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image-edge"],
  colorMode: {
    preference: 'light'
  },
  image: {
    domains: ["https://fakestoreapi.com/"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,

    }
  },
});
