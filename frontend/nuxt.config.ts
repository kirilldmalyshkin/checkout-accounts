// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiBaseUri = process.env.API_URL || "http://localhost:1337";
console.log('strapiBaseUri', strapiBaseUri);
// @ts-ignore
export default defineNuxtConfig({
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
      apiBase: "/api",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image-edge", "@nuxtjs/apollo"],
  colorMode: {
    preference: 'light'
  },
  // app: {
  //   pageTransition: {
  //     name: "fade",
  //     mode: "out-in", // default
  //   },
  //   layoutTransition: {
  //     name: "slide",
  //     mode: "out-in", // default
  //   },
  // },
  // apollo: {
  //   clients: {
  //     default: {
  //       httpEndpoint: 'https://spacex-production.up.railway.app'
  //     }
  //   },
  // },
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${strapiBaseUri}/graphql`,
        browserHttpEndpoint: `${strapiBaseUri}/graphql`,
        wsEndpoint: '',
        httpLinkOptions: {},
        wsLinkOptions: {},
        websocketsOnly: false,
        connectToDevTools: false,
        defaultOptions: {},
        inMemoryCacheOptions: {},
        tokenName: 'apollo:<client-name>.token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
      other: './apollo/other.ts'
    }
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
