import { ref } from 'vue'
import { storage } from '@/firebase/config'
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const fileIsPending = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file, fileName) => {

    error.value = null
    fileIsPending.value = false

    if (fileName) {
      filePath.value = `userThumbnail/${user.value.uid}/${fileName}`
    } else {
      filePath.value = `userThumbnail/${user.value.uid}/${file.name}`
    }

    const imageRef = storageRef(storage, filePath.value)

    try {
      const res = await uploadBytes(imageRef, file)
      console.log("file: useStorage.js:29 ~ uploadImage ~ res:", res)
      url.value = await getDownloadURL(res.ref)
      console.log("file: useStorage.js:31 ~ uploadImage ~ url.value:", url.value)
      fileIsPending.value = false
    } catch (err) {
      console.log("file: useStorage.js:33 ~ uploadImage ~ err:", err)
      err.message = '圖片傳送失敗'
      error.value = err.message
      fileIsPending.value = false
    }
  }
  
  const deleteFile = async (path) => {
    const imageRef = storageRef(storage, path)
    try {
      await deleteObject(imageRef)
    } catch (err) {
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage, fileIsPending, deleteFile }

}

export default useStorage