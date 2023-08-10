import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import useStorage from '@/composables/useStorage'

const error = ref(null)
const isPending = ref(false)
const { url, uploadImage } = useStorage()

const signup = async (email, password, displayName, thumbnail) => {
   error.value = null
   isPending.value = true
   try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (!res) {
         throw new Error('無法註冊')
      }
      if (thumbnail) {
         await uploadImage(thumbnail)
      }
      await updateProfile(res.user, { displayName, photoURL: url.value })
      error.value = null
      isPending.value = false
   } catch (err) {
      err.message = '帳號和密碼未符標準'
      error.value = err.message
      isPending.value = false
   }
}

const useSignup = () => {
   return { error, isPending, signup, url }
}

export default useSignup
