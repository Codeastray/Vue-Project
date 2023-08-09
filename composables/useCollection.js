import { ref } from "vue";
import { db } from "@/firebase/config";
import { addDoc, collection } from 'firebase/firestore'

const useCollection = (_collection) => {

  const error = ref(null)

  const addToDoc = async (doc) => {
    console.log("🚀 ~ file: useCollection.js:9 ~ addToDoc ~ doc:", doc)
    error.value = null
    try {
        await addDoc(collection(db, _collection), doc)
    } catch (err) {
        console.log(err)
        error.value = '無法送出'
    }
  }

  return { error, addToDoc}

}

export default useCollection