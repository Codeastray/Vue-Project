<template>
  <div
    class=" grid grid-cols-4 items-center max-xl:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 max-sm:mt-3 ">
    <div v-for="note in notes">
      <NoteCard :note=note />
    </div>
    <NuxtLink to='/notes/create_note' class=" max-sm:hidden">
      <div class=" note-card h-[425px] border-dashed">
        <span class="material-symbols-outlined cursor-pointer text-[300px] pt-9 h-full text-slate-500 -ml-4">
          add
        </span>
      </div>
    </NuxtLink>
  </div>
  <h3 v-if="notes && !notes.length"
    class="m-5 font-bold animate-pulse sm:hidden  text-center text-3xl text-cyan-400 transition transfor animate-wiggle animate-infinite animate-duration-[2000ms] animate-delay-0 animate-ease-in-out animate-normal">
    開始啟程旅行<br>紀錄點什麼吧!
  </h3>
  <NuxtLink to='/notes/create_note' class=" sm:hidden">
    <button
      class=" fixed bottom-4 right-4 p-0 w-16 h-16 bg-primary ring-2 ring-sky-600 rounded-full  active:shadow-lg shadow ">
      <span class="material-symbols-outlined text-4xl text-sky-600 ">
        edit_square
      </span>
    </button>
  </NuxtLink>
</template>

<script setup>
definePageMeta({
  layout: 'notes'
})
import getUser from '@/composables/getUser';

const { user, docus: notes, error } = getUser('travelDairy', ['userId', '=='])





</script>

<style scoped></style>