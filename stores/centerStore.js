import { defineStore } from "pinia";
import { ref } from "vue";
import getCollection from '@/composables/getCollection';

export const useCenterStore = defineStore('center', {
    state: () => ({
        center:'',
    }),
    actions: {
        addQuerykeyword(query) {
          this.center = query
          
        },
    }
})