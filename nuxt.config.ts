// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:[
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href:'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        },
      ],
    },
  },
  
  // imports:{
  //   autoImport: true
  // }
  // experimental: {
  //   componentIslands: true
  // }  //只用XXX.server.vue就要設定這個，如果沒有同名的vue各一個client和server 都要設置
  // ssr: false
  // routeRules: {
  //   '/notes/index': { ssr: false },

  // }
});
