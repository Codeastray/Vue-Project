import { ref } from 'vue'
import { db } from '@/firebase/config'
import { query, where, orderBy, onSnapshot, collection } from 'firebase/firestore'

const getCollection = (_collection, _query) => {
   const documents = ref(null)
   const error = ref(null)

   let collecitonRef = collection(db, _collection)

   if (_query) { //如果有設定Query參數
      collecitonRef = query(collecitonRef, where(..._query), orderBy('createdAt'))
   } else {
      collecitonRef = query(collecitonRef, orderBy('createdAt'))
   }

   const unsub = onSnapshot( //unsub是onSnapshot(即時監聽資料更新渲染功能)，如果執行unsub()就會取消監聽 
      collecitonRef,
      snapshot => {
         let results = []
         snapshot.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id }) //有timestamp才會抓取
         })
         documents.value = results
         error.value = null
      },
      err => {
         documents.value = null
         error.value = '無法取得檔案'
      },
   )

   watchEffect(onInvalidate => { //當unmount後watchEffect會無效，並執行onInvalidate函數內的unsub來取消onSnapshot監聽
      onInvalidate(() => unsub())
   })

   return { documents }
}

export default getCollection
