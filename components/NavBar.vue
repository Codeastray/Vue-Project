<template>
   <nav class=" max-sm:flex max-sm:flex-col max-sm:border-b-2  max-sm:box-border max-sm:w-full max-sm:m-0  ">
      <NuxtLink to='/' class="max-sm:mb-4">
         <div class="flex flex-row items-center ml-4 max-sm:m-0">
            <img src="@/assets/css/travel3.png" class=" w-28  max-sm:w-20 max-sm:mr-10 max-sm:-mb-4 ">
            <span class="text-7xl ml-2 max-sm:text-5xl max-sm:-ml-6 max-sm:mt-3">旅遊札記</span>
         </div>
      </NuxtLink>
      <h3 v-if="user" class=" max-sm:hidden text-5xl text-center text-teal-600">今天就是旅行的日子了! <br> 你說是不是啊? <span
            class=" text-sky-600 text-5xl font-extrabold">{{ user.displayName }}</span> !</h3>
      <div class="flex flex-row">
         <div v-if="!user" class="flex flex-row mr-10 max-sm:mr-4  max-sm:mb-4 max-sm:-mt-2">
            <NuxtLink @click="signupError = false" to='/signup' class=" ring-2 ring-primary">註冊</NuxtLink>
            <NuxtLink @click="error = false, menuShow = false" to='/login' class=" ring-2 ring-primary">登入</NuxtLink>
         </div>
         <div v-if="user" class="flex ">
            <div class="flex max-sm:ml-2  max-sm:mb-3">
               <div class="relative max-sm:w-[375px] max-sm:ml-8 ">
                  <div v-if="user" class="flex  cursor-pointer mr-16 max-sm:m-0 items-center">
                     <span class="hidden max-sm:inline max-sm:ml-0  max-sm:text-2xl ">現在就去<span
                           class=" text-4xl text-emerald-400">旅行</span>!!!</span>
                     <img :src="user.photoURL" ref="menu"
                        class="w-12 h-12 object-cover rounded-full max-sm:ml-3 max-sm:mb-2" @click="toggleHandler" alt="">
                  </div>
                  <!-- Dropdown menu -->
                  <div v-if="menuShow"
                     class="absolute right-0 z-20 w-56 py-2 mr-4 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                     <div class="transform origin-top transition-transform">
                        <div class="flex items-center p-4 -mt-2">
                           <img v-if="user" :src="user.photoURL" class="w-12 h-12 object-cover rounded-full block" alt="">
                           <h5 class="ml-2 text-5xl">{{ user.displayName }}</h5>
                        </div>
                        <hr class="border-gray-200 dark:border-gray-700 ">
                        <div @click="handleLogout"
                           class="block text-3xl cursor-pointer px-4 py-3  text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100">
                           登出</div>
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

const menuShow = ref(false)
const { user } = getUser()
const { error } = useLogin()
const { error: signupError } = useSignup()
const router = useRouter()
const menu = ref(null)

const handleLogout = () => {
   signOut(auth)
   router.push('/login')
   menuShow.value = false
}

const toggleHandler = () => {
   menuShow.value = !menuShow.value
}

const closeMenuOnClickOutside = (event) => {
   if (menu.value && !menu.value.contains(event.target)) {
      menuShow.value = false;
   }
}

onMounted(() => {
   document.addEventListener('click', closeMenuOnClickOutside)
})

onBeforeUnmount(() => {
   document.removeEventListener('click', closeMenuOnClickOutside)
})
</script>

<style scoped>

</style>