<template>
   <button @click="returnToPrePage"
      class="max-sm:w-12 max-sm:h-12 ml-auto mt-6 max-sm:ml-4 mb-3  w-20 h-20 border-2 border-primary rounded-full ring-1 ring-slate-400">
      <span class="mt-2 material-symbols-outlined text-4xl max-sm:m-0  max-sm:-mt-1  text-green-300 max-sm:text-3xl  ">
         arrow_back
      </span>
   </button>
   <form v-if="note" class="form-control w-5/6 text-center max-sm:px-2 max-sm:pt-6   max-sm:w-full  max-sm:mt-2"
      @submit.prevent="handleSubmit">
      <p class="text-4xl ">更新旅遊札記</p>
      <input class="bg-primary rounded-t-md" type="text" placeholder="標題" v-model="title">
      <h2 v-if="photoPreview">照片預覽 <img class="mx-auto w-52 object-cover" :src="photoPreview" alt=""></h2>
      <div class="flex flex-col items-center justify-center w-full" @drop.prevent="onDrop" @dragover.prevent>
         <h2 class=" mr-auto text-3xl">更新旅行圖片</h2>
         <label for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
               <span class="material-symbols-outlined text-5xl ">
                  upload
               </span>
               <p class="mb-2 text-xl text-gray-500 dark:text-gray-400"><span class="text-2xl">點擊選擇圖片</span> <span
                     class="max-sm:hidden block">或拖曳圖片</span>
               </p>
               <p class=" text-base text-gray-500 text-center dark:text-gray-400"> PNG, JPG (MAX. 2MB)</p>
            </div>
            <input @change="handleFileChanged" id="dropzone-file" type="file" class="hidden" />
         </label>
      </div>
      <div class="error" v-if="storageError">{{ storageError }}</div>
      <div class="error" v-if="photoError">{{ photoError }}</div>
      <input type="text" class="bg-primary rounded-t-md" placeholder="地點" v-model="location">
      <textarea class="bg-primary text-2xl outline-dashed" name="" id="" cols="30" rows="10"
         v-model="noteContent"></textarea>
      <button v-if="!isPending">儲存</button>
      <button v-else disabled>儲存中 </button>
      <!-- <div class="error" v-if='error'>{{ error }}</div> -->
   </form>
</template>
<script setup>
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'

const { id } = useRoute().query
const { document: note } = getDocument('travelDairy', id)
const title = ref('')
const location = ref('')
const noteContent = ref('')
const photo = ref('')
const photoFileName = ref('')
const photoError = ref(null)
const isPending = ref(false)
const photoPreview = ref(null)

let noteData = {}
const { error: storageError, uploadImage, url } = useStorage()
const { isPending: editError, error, updateTheDoc } = useDocument('travelDairy', id)
const router = useRouter()

watchEffect(() => {
   if (note.value) {
      title.value = note.value.title;
      location.value = note.value.location;
      noteContent.value = note.value.noteContent;
      photoFileName.value = note.value.photoFileName;
      noteData.photoUrl = url.value
   }
});

const handleSubmit = async () => {
   isPending.value = true
   if (photo.value) {
      noteData = {
         title: title.value,
         location: location.value,
         noteContent: noteContent.value,
         photoUrl: url.value,
         // userId: user.value.uid,
         // filePath: filePath.value,
         // createdAt: timestamp
      }
      await uploadImage(photo.value, photoFileName.value)
      await updateTheDoc({
         ...noteData
      })
      isPending.value = false
   } else {
      noteData = {
         title: title.value,
         location: location.value,
         noteContent: noteContent.value,
      }
      await updateTheDoc({
         ...noteData
      })
   }

   if (!error.value) {
      // window.removeEventListener('popstate', popstateHandler);
      //跳到note_edit.html之外的頁面
      router.push(`/notes/${id}`)
   }
}

const returnToPrePage = () => {
   router.push(`/notes/${id}`)
}

const photoCheck = (_selected) => {
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
   reader.onload = (e => {
      photoPreview.value = e.target.result
   })
   reader.readAsDataURL(_selected)
   photoError.value = null
   photo.value = _selected
}

const reloadHandler = (event) => {
   window.removeEventListener("beforeunload", reloadHandler);
   event.returnValue = "";
}
if (process.client) {
   window.addEventListener("beforeunload", reloadHandler);
}
// onBeforeRouteLeave((to, from, next) => {
//    const answer = window.confirm('未儲存，確定要離開嗎?')
//    if (answer) {
//       next()
//    } else {
//       next(false)
//    }
 

// })

const handleFileChanged = (e) => {
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

const onDrop = (e) => {
   photoPreview.value = null
   const selected = e.dataTransfer.files[0];
   photoCheck(selected)
}

</script>
<style  scoped></style>
