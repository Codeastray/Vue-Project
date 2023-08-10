import { ref } from 'vue'
import { db } from '@/firebase/config'
import { query, where, onSnapshot, doc } from 'firebase/firestore'

const getDocument = (_collection, id, _query) => {
   const document = ref(null)
   const error = ref(null)
   let documentRef = doc(db, _collection, id)

   if (_query) {
      documentRef = query(documentRef, where(..._query))
   }

   const unsub = onSnapshot(
      documentRef,
      doc => {
         if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
         } else {
            error.value = '文件檔案不存在'
         }
      },
      err => {
         document.value = null
         error.value = '無法取得檔案'
      },
   )
   watchEffect(onInvalidate => {
      onInvalidate(() => unsub())
   })
   console.log('file: getDocument.js:32 ~ getDocument ~ ocument:', document)

   return { document, error }
}

export default getDocument
