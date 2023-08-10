import { ref } from 'vue'
import { db } from '@/firebase/config'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

const useDocument = (_collection, id) => {
   const error = ref(null)
   const isPending = ref(false)
   let docRef = doc(db, _collection, id)

   const deleteTheDoc = async () => {
      isPending.value = true
      error.value = null
      try {
         const res = await deleteDoc(docRef)
         isPending.value = false
         return res
      } catch (err) {
         error.value = '無法刪除文章'
         isPending.value = false
      }
   }

   const updateTheDoc = async updates => {
      isPending.value = true
      error.value = null
      try {
         const res = await updateDoc(docRef, updates)
         isPending.value = false
         return res //之後可能會用到
      } catch (err) {
         error.value = '無法更新文章'
         isPending.value = false
      }
   }

   return { error, isPending, deleteTheDoc, updateTheDoc }
}

export default useDocument
