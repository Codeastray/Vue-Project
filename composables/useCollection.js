import { ref } from 'vue'
import { db } from '@/firebase/config'
import { addDoc, collection } from 'firebase/firestore'

const useCollection = _collection => {
   const error = ref(null)

   const addToDoc = async doc => {
      error.value = null
      try {
         await addDoc(collection(db, _collection), doc)
      } catch (err) {
         error.value = '無法送出'
      }
   }

   return { error, addToDoc }
}

export default useCollection
