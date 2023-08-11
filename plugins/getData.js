import getUser from '@/composables/getUser'
export default defineNuxtPlugin(nuxtApp => {
   nuxtApp.hook('app:beforeMount', () => { //使用Nuxt 3中app的 lifecycle hook，
      const { user, docus: notes, error } = getUser('travelDairy', ['userId', '=='])
   })
})
