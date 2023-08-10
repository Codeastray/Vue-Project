<template>
   <form class="mx-32 flex items-center max-sm:mx-5" @submit.prevent="handleSubmit">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
         <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
            <span class="material-symbols-outlined text-4xl"> description </span>
         </div>
         <input
            type="text"
            id="simple-search"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-3xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 max-sm:text-2xl"
            placeholder="找尋你的足跡..."
            required
            v-model="query" />
      </div>
      <button
         type="submit"
         class="ml-2 rounded-lg border border-blue-700 bg-primary p-2.5 text-sm font-medium text-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
         <span class="material-symbols-outlined text-2xl"> search </span>
         <span class="sr-only">Search</span>
      </button>
   </form>
</template>

<script setup>
   import { useCenterStore } from '@/stores/centerStore'
   const centerStore = useCenterStore()
   const query = ref('')
   const router = useRouter()
   const handleSubmit = async () => {
      centerStore.addQuerykeyword(query.value)
      console.log('file: SearchBar.vue:32 ~ handleSubmit ~  centerStore.center:', centerStore.center)
      router.push('/notes/search')
   }
</script>

<style scoped></style>
