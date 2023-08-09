import { ref } from "vue";
import { db } from "@/firebase/config";
import {query, where, orderBy, onSnapshot, collection } from 'firebase/firestore'

const getCollection = (_collection, _query) => {
    const documents = ref(null)
    const error = ref(null)

    let collecitonRef = collection(db, _collection)

    if (_query) {
        collecitonRef = query(collecitonRef, where(..._query), orderBy('createdAt'))
    } else {
        collecitonRef = query(collecitonRef,orderBy('createdAt'))
    }

    const unsub = onSnapshot(collecitonRef, snapshot => {
        let results = []
        snapshot.docs.forEach(doc => {
          doc.data().createdAt && results.push({ ...doc.data(), id: doc.id }) //有timestamp才會抓取
        });
       documents.value = results
       console.log("file: getCollection.js:23 ~ unsub ~ documents.value:", documents.value)
       error.value = null
    }, (err) => {
      documents.value = null
      console.log("file: getCollection.js:27 ~ unsub ~ documents.value:", documents.value)
      error.value = '無法取得檔案'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return {documents}
}

export default getCollection