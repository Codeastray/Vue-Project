<template>
   <div>
      <form
         class="form-control w-5/6 text-center max-sm:mt-2 max-sm:w-full max-sm:px-2 max-sm:pt-6"
         @submit.prevent="handleSubmit">
         <p class="text-4xl">建立旅遊札記</p>
         <input class="" type="text" placeholder="標題" v-model="title" />
         <h2 v-if="photoPreview">照片預覽 <img class="mx-auto w-52 object-cover" :src="photoPreview" alt="" /></h2>
         <div class="flex w-full flex-col items-center justify-center" @drop.prevent="onDrop" @dragover.prevent>
            <h2 class="mr-auto text-3xl">上傳旅行圖片</h2>
            <label
               for="dropzone-file"
               class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
               <div class="flex flex-col items-center justify-center pb-6 pt-5">
                  <span class="material-symbols-outlined text-5xl"> upload </span>
                  <p class="mb-2 text-xl text-gray-500 dark:text-gray-400">
                     <span class="text-2xl">點擊選擇圖片</span> <span class="block max-sm:hidden">或拖曳圖片</span>
                  </p>
                  <p class="text-base text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 2MB)</p>
               </div>
               <input @change="handleFileChanged" id="dropzone-file" type="file" class="hidden" />
            </label>
         </div>
         <div class="error" v-if="storageError">{{ storageError }}</div>
         <div class="error" v-if="photoError">{{ photoError }}</div>
         <input type="text" placeholder="地點" v-model="location" />
         <textarea class="outline-dashed" name="" id="" cols="30" rows="10" v-model="noteContent"></textarea>
         <button v-if="!isPending">送出</button>
         <button v-else disabled>送出中</button>
         <div class="error" v-if="isFillUpError">{{ isFillUpError }}</div>
         <div class="error" v-if="error">{{ error }}</div>
      </form>
   </div>
</template>

<script setup>
   import useStorage from '@/composables/useStorage'
   import useCollection from '@/composables/useCollection'
   import getUser from '@/composables/getUser'
   import { timestamp } from '@/firebase/config'

   const title = ref('')
   const location = ref('')
   const noteContent = ref('')
   const photo = ref(null)
   const photoError = ref(null)
   const isPending = ref(false)
   const photoPreview = ref(null)
   const isFillUpError = ref(null)

   const { url, filePath, error: storageError, uploadImage, fileIsPending } = useStorage()
   const { error, addToDoc } = useCollection('travelDairy')
   const { user } = getUser()
   const router = useRouter()

   const handleSubmit = async () => {
      isPending.value = true
      if (photo.value && title.value && location.value && noteContent.value) {
         await uploadImage(photo.value)
         await addToDoc({
            title: title.value,
            location: location.value,
            userId: user.value.uid,
            noteContent: noteContent.value,
            filePath: filePath.value,
            photoUrl: url.value,
            createdAt: timestamp,
            photoFileName: photo.value.name,
         })
         isPending.value = false
         if (!error.value) {
            router.push('/notes/')
         }
      } else {
         isPending.value = false
         isFillUpError.value = '尚有內容未填'
      }
   }

   const photoCheck = _selected => {
      const types = ['image/png', 'image/jpeg']
      photo.value = null

      if (!types.includes(_selected.type)) {
         photoError.value = '檔案必須是png或jpeg圖片類型'
         return
      }

      if (_selected.size > 2000000) {
         photoError.value = '檔案大小要小於2MB'
         return
      }

      const reader = new FileReader()
      reader.onload = e => {
         photoPreview.value = e.target.result
      }
      reader.readAsDataURL(_selected)

      photoError.value = null
      photo.value = _selected
   }

   const handleFileChanged = e => {
      const selected = e.target.files[0]
      if (!selected) {
         if (photoPreview.value) {
            return
         }
         photoError.value = '請選擇圖片'
         return
      }
      photoPreview.value = null
      photoCheck(selected)
   }

   const onDrop = e => {
      photoPreview.value = null
      const selected = e.dataTransfer.files[0]
      photoCheck(selected)
   }
</script>

<style scoped></style>
