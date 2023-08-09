<template>
    <form class="form-control max-sm:p-5" @submit.prevent="handleSubmit">
        <p class="text-4xl">註冊帳號</p>
        <input type="email" placeholder="信箱(格式正確)" v-model="email">
        <input type="password" placeholder="密碼(至少6碼)" v-model="password">
        <input type="text" placeholder="暱稱" v-model="displayName">
        <div class="flex flex-col items-center justify-center w-full" @drop.prevent="onDrop" @dragover.prevent>
            <h2 class=" mr-auto text-3xl">上傳頭貼</h2>
            <h2 v-if="thumbnailPreview">照片預覽 <img class="mx-auto w-52 object-cover" :src="thumbnailPreview" alt=""></h2>
            <label for="dropzone-file"
                class="flex flex-col mt-7 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <span class="material-symbols-outlined text-5xl ">
                        upload
                    </span>
                    <p class="mb-2 text-xl text-gray-500 dark:text-gray-400">
                        <span class="text-2xl">點擊選擇圖片</span> 
                        <span class="max-sm:hidden block text-center">或拖曳圖片</span>
                    </p>
                    <p class=" text-base text-gray-500 dark:text-gray-400"> PNG, JPG (MAX. 1MB)</p>
                </div>
                <input @change="handleFileChanged" id="dropzone-file" type="file" class="hidden" />
            </label>
        </div>
        <div class="error mt-5 text-center" v-if="thumbnailError">{{ thumbnailError }}</div>
        <button v-if="!isPending" class="btn">註冊</button>
        <button v-if="isPending" class="btn" disabled>註冊中..</button>
        <div class="error" v-if='storageError'>{{ storageError }}</div>
        <div class="error" v-if='error'>{{ error }}</div>
    </form>
</template>
<script setup>
import useStorage from '@/composables/useStorage'
import useSignup from '@/composables/useSignup';
import { useCenterStore } from '@/stores/centerStore';

const centerStore = useCenterStore()
const email = ref('')
const password = ref('')
const displayName = ref('')
const thumbnailPreview = ref(null)
const thumbnail = ref(null)
const thumbnailError = ref(null)
const { error, isPending, signup, url } = useSignup()
const { error: storageError } = useStorage()
const router = useRouter()




const handleSubmit = async () => {
    await signup(email.value, password.value, displayName.value, thumbnail.value)
    if (!error.value) {
        centerStore.userPhotoUrl = url.value 
        router.push('/') 
    }
}

const thumbnailCheck = (_selected) => {
    const types = ['image/png', 'image/jpeg']
    thumbnail.value = null
    if (!types.includes(_selected.type)) {
        thumbnailError.value = '檔案必須是png或jpeg圖片類型'
        return
    }
    if (_selected.size > 1000000) {
        thumbnailError.value = '檔案大小要小於1MB'
        return
    }
    const reader = new FileReader()
    reader.onload = (e => {
        thumbnailPreview.value = e.target.result
    })
    reader.readAsDataURL(_selected)
    thumbnailError.value = null
    thumbnail.value = _selected
}

const handleFileChanged = (e) => {
    const selected = e.target.files[0]
    if (!selected) {
        if (thumbnailPreview.value) {
            return
        }
        thumbnailError.value = '請選擇圖片'
        return
    }
    thumbnailPreview.value = null
    thumbnailCheck(selected)
}

const onDrop = (e) => {
    thumbnailPreview.value = null
    const selected = e.dataTransfer.files[0];
    thumbnailCheck(selected)
}

</script>
<style  scoped></style>