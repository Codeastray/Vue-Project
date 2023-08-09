<template>
  <div class="text-center ">
    <NuxtLink to="/notes" @click="checkLogin">
      <button 
        class="start-btn text-3xl shadow-2xl mt-10 relative animate-pulse animate-infinite animate-delay-[3000ms] animate-ease-in-out animate-normal ring-8 ring-primary">
        開始記錄
      </button>
    </NuxtLink>
  </div>
  <div class="grid grid-cols-3 w-full mx-auto h-[680px] overflow-hidden max-sm:h-[500px]  ">
    <!-- 其他圖片放在這裡 -->
    <img
      class="wallet w-[360px] mx-auto ml-40 animate-fade-right animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-500"
      src="assets\css\wallet.png" alt="">
    <img
      class="photo w-[700px] mx-auto -ml-4 animate-fade-down animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-900"
      src="assets\css\photo.png" alt="">
    <img
      class="ticket  -ml-32 mt-20 animate-fade-left animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-700"
      src="assets\css\ticket.png" alt="">
    <img
      class="camera w-[300px] mx-auto ml-44  animate-fade-up  animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-500"
      src="assets\css\camera.png" alt="">
    <img
      class="case  w-[800px]  -ml-4 z-10 -mt-32 animate-jump-in animate-once animate-delay-[2300ms] animate-ease-in-out animate-normal"
      src="assets\css\case.png" alt="">
    <img
      class="smallCase w-[300px] mx-auto -ml-8 -mt-10  animate-fade-left animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-1200"
      src="assets\css\smallCase.png" alt="">
  </div>
  <div class=" h-[600px] overflow-hidden -mt-[600px] -ml-10 ">
    <img
      class="globe h-30 overflow-hidden w-[2000px]  mx-auto animate-spin animate-infinite animate-duration-[12000ms] animate-ease-linear animate-normal  max-sm:mt-[150px]"
      src="assets\css\globe.png" alt="">
  </div>
</template>

<script setup>
import getUser from '@/composables/getUser'
const { user } = getUser()
const router = useRouter()

const checkLogin = () => {
  if (!user.value) {
    router.push('/login')
  }
}

</script>

<style scoped></style>
  