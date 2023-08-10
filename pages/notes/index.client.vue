<template>
   <div
      class="grid grid-cols-4 items-center gap-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:mt-3 max-sm:grid-cols-1">
      <div v-for="note in notes">
         <NoteCard :note="note" />
      </div>
      <NuxtLink to="/notes/create_note" class="max-sm:hidden">
         <div class="note-card h-[425px] border-dashed">
            <span class="material-symbols-outlined -ml-4 h-full cursor-pointer pt-9 text-[300px] text-slate-500">
               add
            </span>
         </div>
      </NuxtLink>
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

   const { user, docus: notes, error } = getUser('travelDairy', ['userId', '=='])
</script>

<style scoped></style>
