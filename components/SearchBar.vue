<template>
    <form class="flex items-center mx-32 max-sm:mx-5" @submit.prevent="handleSubmit">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                <span class="material-symbols-outlined text-4xl">
                    description
                </span>
            </div>
            <input type="text" id="simple-search"
                class="bg-gray-50 border max-sm:text-2xl border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                placeholder="找尋你的足跡..." required v-model="query">
        </div>
        <button type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-sky-600 bg-primary rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  ">
            <span class="material-symbols-outlined text-2xl ">
                search
            </span>
            <span class="sr-only">Search</span>
        </button>
    </form>
</template>

<script setup >
import { useCenterStore } from '@/stores/centerStore';
const centerStore = useCenterStore()
const query = ref("")
const router = useRouter()
const handleSubmit = async () => {
    centerStore.addQuerykeyword(query.value)
    console.log("file: SearchBar.vue:32 ~ handleSubmit ~  centerStore.center:", centerStore.center)
    router.push('/notes/search')
}
</script>

<style scoped></style>