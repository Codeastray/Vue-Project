import { defineStore } from "pinia";

export const useCenterStore = defineStore('center', {
    state: () => ({
        center:'',
        userPhotoUrl:''
    }),
    actions: {
        addQuerykeyword(query) {
          this.center = query
        },
    }
})