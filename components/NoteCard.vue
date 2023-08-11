<template>
   <div v-if="error" class="error">{{ error }}</div>
   <div v-if="note">
      <div class="note-card">
         <div>
            <h4 class="text-3xl font-bold">{{ note.title.substring(0, 8) + '...' }}</h4>
            <img
               @click="linkToDetail(note.id)"
               :src="note.photoUrl"
               class="mx-auto h-48 w-full cursor-pointer border-2 object-cover shadow-lg" />
            <div class="mt-2 flex">
               <span class="material-symbols-outlined text-3xl text-sky-600"> distance </span>
               <p class="mt-1 inline-block text-2xl">{{ note.location }}</p>
            </div>
            <span class="block">札記內文: </span>
            <p class="flex">
               {{ note.noteContent.substring(0, 14) + '...' }}
               <span
                  @click="handleDelete(note)"
                  class="material-symbols-outlined ml-auto mt-auto inline-block cursor-pointer text-4xl text-red-500 hover:rounded-2xl hover:bg-red-500 hover:text-white max-sm:hover:bg-transparent max-sm:hover:text-red-500">
                  delete
               </span>
            </p>
         </div>
      </div>
   </div>
</template>
<script setup>
   const { note } = defineProps(['note'])
   import useDocument from '@/composables/useDocument'
   import useStorage from '@/composables/useStorage'

   const { deleteFile } = useStorage()
   const router = useRouter()
  
   const handleDelete = async note => {
      if (confirm('確定要刪除這篇札記?')) {
         const { error: delError, isPending, deleteTheDoc } = useDocument('travelDairy', note.id)
         await deleteFile(note.filePath)
         await deleteTheDoc()
         router.push('/notes/')
      }
   }

   const linkToDetail = id => {
      router.push(`/notes/${id}`)
      // navigateTo({           //開啟新網頁，但是手機會引起按back button後，返回上一頁沒有uid的問題
      //     path: `/notes/${id}`
      // }, {
      //     open: {
      //         target: '_blank'
      //     }
      // })
   }
</script>
<style scoped></style>
