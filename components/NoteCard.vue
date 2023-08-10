<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="note">
        <div class="note-card ">
            <div>
                <h4 class="font-bold text-3xl">{{ note.title.substring(0, 8) + '...' }}</h4>
                <img @click="linkToDetail(note.id)" :src="note.photoUrl"
                    class="mx-auto w-full h-48 object-cover border-2 cursor-pointer shadow-lg">
                <div class="flex mt-2">
                    <span class="material-symbols-outlined text-3xl text-sky-600">
                        distance
                    </span>
                    <p class=" inline-block text-2xl mt-1">{{ note.location }}</p>
                </div>
                <span class="block">札記內文: </span>
                <p class="flex">{{ note.noteContent.substring(0, 14) + '...' }}
                    <span @click="handleDelete(note)"
                        class="max-sm:hover:bg-transparent cursor-pointer max-sm:hover:text-red-500 inline-block material-symbols-outlined text-red-500 ml-auto mt-auto text-4xl hover:text-white hover:bg-red-500 hover:rounded-2xl">
                        delete
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
// import getCollection from '@/composables/getCollection';
const { note } = defineProps(['note'])
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';

const { deleteFile } = useStorage()
const router = useRouter()
// const { documents: notes, error } = getCollection(
//     'travelDairy',
//     ['userId', '==', 'user.value.uid' ]
// )

const handleDelete = async (note) => {
    if (confirm('確定要刪除這篇札記?')) {
        const { error: delError, isPending, deleteTheDoc } = useDocument('travelDairy', note.id)
        await deleteFile(note.filePath)
        await deleteTheDoc()
        router.push('/notes/')
    }
}

const linkToDetail = (id) => {
    router.push(`/notes/${id}`)
    // navigateTo({
    //     path: `/notes/${id}`
    // }, {
    //     open: {
    //         target: '_blank'
    //     }
    // })
}
</script>
<style scoped></style> 