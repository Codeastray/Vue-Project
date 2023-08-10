<template>
   <div
      class="grid grid-cols-4 items-center gap-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:mt-3 max-sm:grid-cols-1">
      <div v-for="note in notes">
         <NoteCard :note="note" />
      </div>
      <NuxtLink to="/notes/create_note" class="max-sm:hidden">
         <div v-if="notes" class="note-card h-[425px] border-dashed">
            <span class="material-symbols-outlined -ml-4 h-full cursor-pointer pt-9 text-[300px] text-slate-500">
               add
            </span>
         </div>
      </NuxtLink>
   </div>
   <div v-if="!notes" role="status" class="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
      <svg
         aria-hidden="true"
         class="mr-2 h-14 w-14 animate-spin fill-teal-500 text-gray-200 dark:text-gray-600 max-sm:h-8 max-sm:w-8"
         viewBox="0 0 100 101"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
         <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
      </svg>
   </div>
   <h3
      v-if="notes && !notes.length"
      class="transfor m-5 animate-pulse animate-wiggle text-center text-3xl font-bold text-cyan-400 transition animate-delay-0 animate-normal animate-duration-[2000ms] animate-infinite animate-ease-in-out sm:hidden">
      開始啟程旅行<br />紀錄點什麼吧!
   </h3>
   <NuxtLink to="/notes/create_note" class="sm:hidden">
      <button
         class="fixed bottom-4 right-4 h-16 w-16 rounded-full bg-primary p-0 shadow ring-2 ring-sky-600 active:shadow-lg">
         <span class="material-symbols-outlined text-4xl text-sky-600"> edit_square </span>
      </button>
   </NuxtLink>
</template>
<script setup>
   definePageMeta({
      layout: 'notes',
   })

   import getUser from '@/composables/getUser'

   const router = useRouter()
   router.push(`/notes/`)
   const { user, docus: notes, error } = getUser('travelDairy', ['userId', '=='])
</script>
<style scoped></style>
