<template>
   <nav class="max-sm:m-0 max-sm:box-border max-sm:flex max-sm:w-full max-sm:flex-col max-sm:border-b-2">
      <NuxtLink to="/" class="max-sm:mb-4">
         <div class="ml-4 flex flex-row items-center max-sm:m-0">
            <img src="@/assets/css/travel3.png" class="w-28 max-sm:-mb-4 max-sm:mr-10 max-sm:w-20" />
            <span class="ml-2 text-7xl max-sm:-ml-6 max-sm:mt-3 max-sm:text-5xl">旅遊札記</span>
         </div>
      </NuxtLink>
      <h3 v-if="user" class="text-center text-5xl text-teal-600 max-sm:hidden">
         今天就是旅行的日子了! <br />
         你說是不是啊? <span class="text-5xl font-extrabold text-sky-600">{{ user.displayName }}</span> !
      </h3>
      <div class="flex flex-row">
         <div v-if="!user" class="mr-10 flex flex-row max-sm:-mt-2 max-sm:mb-4 max-sm:mr-4">
            <NuxtLink @click="signupError = false" to="/signup" class="ring-2 ring-primary">註冊</NuxtLink>
            <NuxtLink @click="error = false, menuShow = false" to='/login' class=" ring-2 ring-primary">登入</NuxtLink>
         </div>
         <div v-if="user" class="flex">
            <div class="flex max-sm:mb-3 max-sm:ml-2">
               <div class="relative max-sm:ml-8 max-sm:w-[375px]">
                  <div v-if="user" class="mr-16 flex cursor-pointer items-center max-sm:m-0">
                     <span class="hidden max-sm:ml-0 max-sm:inline max-sm:text-2xl"
                        >現在就去<span class="text-4xl text-emerald-400">旅行</span>!!!</span
                     >
                     <img
                        :src="user.photoURL || centerStore.userPhotoUrl"
                        ref="menu"
                        class="h-12 w-12 rounded-full object-cover max-sm:mb-2 max-sm:ml-3"
                        @click="toggleHandler"
                        alt="" />
                  </div>
                  <!-- Dropdown menu -->
                  <div
                     v-if="menuShow"
                     class="absolute right-0 z-20 mr-4 mt-2 w-56 overflow-hidden rounded-md bg-white py-2 shadow-xl dark:bg-gray-800">
                     <div class="origin-top transform transition-transform">
                        <div class="-mt-2 flex items-center p-4">
                           <img
                              v-if="user"
                              :src="user.photoURL || centerStore.userPhotoUrl"
                              class="block h-12 w-12 rounded-full object-cover"
                              alt="" />
                           <h5 class="ml-2 text-5xl">{{ user.displayName }}</h5>
                        </div>
                        <hr class="border-gray-200 dark:border-gray-700" />
                        <div
                           @click="handleLogout"
                           class="block transform cursor-pointer px-4 py-3 text-3xl capitalize text-gray-600 transition-colors duration-200 hover:bg-gray-100">
                           登出
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </nav>
</template>
<script setup>
   import { auth } from '@/firebase/config'
   import { signOut } from 'firebase/auth'
   import getUser from '@/composables/getUser'
   import useLogin from '@/composables/useLogin'
   import useSignup from '@/composables/useSignup'
   import { useCenterStore } from '@/stores/centerStore'

   const centerStore = useCenterStore()
   const menuShow = ref(false)
   const { user } = getUser()
   const { error } = useLogin()
   const { error: signupError } = useSignup()
   const router = useRouter()
   const menu = ref(null)

   const handleLogout = () => {
      signOut(auth)
      menuShow.value = false
   }
   const toggleHandler = () => {
      menuShow.value = !menuShow.value
   }

   const closeMenuOnClickOutside = event => {
      if (menu.value && !menu.value.contains(event.target)) {
         menuShow.value = false
      }
   }

   onMounted(() => {
      document.addEventListener('click', closeMenuOnClickOutside)
   })

   onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenuOnClickOutside)
   })
</script>

<style scoped></style>
