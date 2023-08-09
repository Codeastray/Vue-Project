<template>
    <button @click="returnToPrePage"
        class="max-sm:w-12 max-sm:h-12 ml-auto mt-6 max-sm:ml-4 mb-3  w-20 h-20 border-2 border-primary rounded-full ring-1 ring-slate-400">
        <span class="mt-2 material-symbols-outlined text-4xl max-sm:m-0  max-sm:-mt-1  text-green-300 max-sm:text-3xl  ">
            arrow_back
        </span>
    </button>
    <div class=" my-6 w-full  max-sm:mb-4  border-gray-200 border-2 mt-2 ">
        <div v-if="note" class="flex flex-col  w-full  max-sm:p-4  mt-3 p-10  max-sm:mt-8 ">
            <span @click="handleDelete"
                class="sm:hidden  ml-auto -mt-4 left-50 overflow-clip cursor-pointer material-symbols-outlined z-10 text-red-500 text-4xl">
                delete
            </span>
            <span @click="handleDelete"
                class="max-sm:hidden cursor-pointer material-symbols-outlined z-10 text-red-500 max-sm:text-4xl  ml-auto text-7xl  hover:text-white hover:bg-red-500 hover:rounded-2xl ">
                delete
            </span>
            <div class="mb-4 ">
                <h4 class=" grow text-center text-5xl font-semibold max-sm:text-3xl ">{{ note.title }}</h4>
            </div>
            <img :src="note.photoUrl"
                class="max-sm:w-full border-2 self-center border-gray-300 p-4 w-2/5 object-cover shadow-lg">
            <div class="flex mt-3 ml-1">
                <span class="material-symbols-outlined  text-2xl mr-3">
                    schedule
                </span>
                <p class=" text-xl">{{ formatDistanceToNow(note.createdAt.toDate(), { locale: locale_zhTW }) + '前' }}</p>
            </div>
            <div class="flex mb-3">
                <span class="material-symbols-outlined text-3xl text-sky-600 mt-1">
                    distance
                </span>
                <p class="text-4xl">{{ note.location }}</p>
            </div>
            <p class="text-2xl  bg-primary rounded-md overflow-hidden w-full p-3">
                <span class="block">札記內文: </span>{{ note.noteContent }}
            </p>
            <span @click=" handlePrevNote()"
                class="max-sm:text-5xl material-symbols-outlined ml-auto text-7xl cursor-pointer">
                edit_square
            </span>
        </div>
    </div>
    <button @click="returnToPrePage"
        class=" ml-auto max-sm:w-12 max-sm:mb-4 max-sm:h-12 max-sm:ml-4 w-20 h-20 border-2 border-primary rounded-full ring-1 ring-slate-400">
        <span class="mt-2 max-sm:m-0  max-sm:-mt-1 max-sm:text-3xl material-symbols-outlined text-4xl text-green-300 ">
            arrow_back
        </span>
    </button>
    <!-- 以下先在伺服端渲染傳出，等待客戶端完成前先上 -->
</template>
<script setup>

import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import { useCenterStore } from '@/stores/centerStore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import locale_zhTW from 'date-fns/locale/zh-TW'

const { id } = useRoute().params
const { error, document: note } = getDocument('travelDairy', id)
const router = useRouter()
const { error: delError, isPending, deleteTheDoc } = useDocument('travelDairy', id)
const { deleteFile } = useStorage()
const centerStore = useCenterStore()

const returnToPrePage = () => {
    router.push('/notes/')
}

const handleDelete = async () => {
    if (confirm('確定要刪除這篇札記?')) {
        await deleteFile(note.value.filePath)
        await deleteTheDoc()
        router.push('/notes/')
    }
}

const handlePrevNote = () => {
    router.push({
        path: '/notes/edit_note',
        query: {
            id
        }
    })
}
</script>
<style  scoped></style>