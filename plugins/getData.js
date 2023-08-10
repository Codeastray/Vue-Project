import getUser from '@/composables/getUser'
export default defineNuxtPlugin(nuxtApp => {
   nuxtApp.hook('app:beforeMount', () => {
      const { user, docus: notes, error } = getUser('travelDairy', ['userId', '=='])
   })
})
