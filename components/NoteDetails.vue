<template>
   <button
      @click="returnToPrePage"
      class="mb-3 ml-auto mt-6 h-20 w-20 rounded-full border-2 border-primary ring-1 ring-slate-400 max-sm:ml-4 max-sm:h-12 max-sm:w-12">
      <span class="material-symbols-outlined mt-2 text-4xl text-green-300 max-sm:m-0 max-sm:-mt-1 max-sm:text-3xl">
         arrow_back
      </span>
   </button>
   <div class="my-6 mt-2 w-full border-2 border-gray-200 max-sm:mb-4">
      <div v-if="note" class="mt-3 flex w-full flex-col p-10 max-sm:mt-8 max-sm:p-4">
         <span
            @click="handleDelete"
            class="left-50 material-symbols-outlined z-10 -mt-4 ml-auto cursor-pointer overflow-clip text-4xl text-red-500 sm:hidden">
            delete
         </span>
         <span
            @click="handleDelete"
            class="material-symbols-outlined z-10 ml-auto cursor-pointer text-7xl text-red-500 hover:rounded-2xl hover:bg-red-500 hover:text-white max-sm:hidden max-sm:text-4xl">
            delete
         </span>
         <div class="mb-4">
            <h4 class="grow text-center text-5xl font-semibold max-sm:text-3xl">{{ note.title }}</h4>
         </div>
         <img
            :src="note.photoUrl"
            class="w-2/5 self-center border-2 border-gray-300 object-cover p-4 shadow-lg max-sm:w-full" />
         <div class="ml-1 mt-3 flex">
            <span class="material-symbols-outlined mr-3 text-2xl"> schedule </span>
            <p class="text-xl">
               {{ formatDistanceToNow(note.createdAt.toDate(), { locale: locale_zhTW }) + '前' }}
            </p>
         </div>
         <div class="mb-3 flex">
            <span class="material-symbols-outlined mt-1 text-3xl text-sky-600"> distance </span>
            <p class="text-4xl">{{ note.location }}</p>
         </div>
         <p class="w-full overflow-hidden rounded-md bg-primary p-3 text-2xl">
            <span class="block">札記內文: </span>{{ note.noteContent }}
         </p>
         <span
            @click="handlePrevNote()"
            class="material-symbols-outlined ml-auto cursor-pointer text-7xl max-sm:text-5xl">
            edit_square
         </span>
      </div>
   </div>
   <button
      @click="returnToPrePage"
      class="ml-auto h-20 w-20 rounded-full border-2 border-primary ring-1 ring-slate-400 max-sm:mb-4 max-sm:ml-4 max-sm:h-12 max-sm:w-12">
      <span class="material-symbols-outlined mt-2 text-4xl text-green-300 max-sm:m-0 max-sm:-mt-1 max-sm:text-3xl">
         arrow_back
      </span>
   </button>

</template>
<script setup>
   import useDocument from '@/composables/useDocument'
   import useStorage from '@/composables/useStorage'
   import { useCenterStore } from '@/stores/centerStore'
   import formatDistanceToNow from 'date-fns/formatDistanceToNow/index'
   import locale_zhTW from 'date-fns/locale/zh-TW/index'

   const { id } = useRoute().params
   const { error, document: note } = getDocument('travelDairy', id)
   const router = useRouter()
   const { error: delError, isPending, deleteTheDoc } = useDocument('travelDairy', id)
   const { deleteFile } = useStorage()
   const centerStore = useCenterStore()
   console.log('file: NoteDetails.vue:67 ~ note.photoUrl.value:', note.photoUrl)
   console.log('file: NoteDetails.vue:67 ~ note:', note)
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
            id,
         },
      })
   }
</script>
<style scoped></style>
