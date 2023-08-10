<template>
   <div
      class="grid grid-cols-4 items-center gap-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:mt-3 max-sm:grid-cols-1">
      <div v-for="note in notes">
         <NoteCard :note="note" />
      </div>
   </div>
</template>

<script setup>
   definePageMeta({
      layout: 'notes',
   })
   // import getCollection from '@/composables/getCollection'
   import getUser from '@/composables/getUser'
   import { useCenterStore } from '@/stores/centerStore'

   const centerStore = useCenterStore()
   const notes = ref(null)
   const filteredNotes = ref(null)
   const router = useRouter()
   const { user, docus: _notes, error } = getUser('travelDairy', ['userId', '=='])

   watchEffect(() => {
      if (centerStore.center) {
         filteredNotes.value = _notes.value.filter(
            _note =>
               _note.title.includes(centerStore.center) ||
               _note.location.includes(centerStore.center) ||
               _note.noteContent.includes(centerStore.center),
         )
         notes.value = filteredNotes.value
      }
   })

   // const { documents: notes, error } = getCollection(
   //     'travelDairy',
   //     ['userId', '==', 'user.value.uid' ]
   // )
</script>
<style scoped></style>
