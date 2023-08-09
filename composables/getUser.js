import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from "@/firebase/config";
import { query, where, orderBy, onSnapshot, collection } from 'firebase/firestore'

const user = ref(auth.currentUser)
const docus = ref(null)
const docError = ref(null)

const getUser = (_collection, _query) => {

    onAuthStateChanged(auth, (_user) => {
        user.value = _user
        console.log("file: 登入者", user.value)
        ////////////為了解決異步問題///////////////
        if (_collection && _query && _user) {

            const getCollection = (_collection, _query) => {

                const documents = ref(null)
                const error = ref(null)

                let collecitonRef = collection(db, _collection)
                if (_query) {
                    collecitonRef = query(collecitonRef, where(..._query, user.value.uid), orderBy('createdAt'))
                } else {
                    collecitonRef = query(collecitonRef, orderBy('createdAt'))
                }

                const unsub = onSnapshot(collecitonRef, snapshot => {
                    let results = []
                    snapshot.docs.forEach(doc => {
                        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id }) //有timestamp才會抓取
                    });
                    documents.value = results
                    docus.value = documents.value
                    error.value = null
                }, (err) => {
                    documents.value = null
                    error.value = '無法取得檔案'
                })
                watchEffect((onInvalidate) => {
                    onInvalidate(() => unsub())
                })
                docError.value = error.value
            }
            getCollection(_collection, _query)
        }
        ////////////為了解決異步問題///////////////
    })

    return { user, docus, docError }
}

export default getUser