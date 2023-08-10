<template>
   <div class="text-center">
      <NuxtLink to="/notes" @click="checkLogin">
         <button
            class="start-btn relative mt-10 animate-pulse text-3xl shadow-2xl ring-8 ring-primary animate-delay-[3000ms] animate-normal animate-infinite animate-ease-in-out">
            開始記錄
         </button>
      </NuxtLink>
   </div>
   <div class="mx-auto grid h-[680px] w-full grid-cols-3 overflow-hidden max-sm:h-[500px]">
      <!-- 其他圖片放在這裡 -->
      <img
         class="wallet mx-auto ml-40 w-[360px] animate-fade-right animate-delay-500 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\wallet.png"
         alt="" />
      <img
         class="photo animate-delay-900 mx-auto -ml-4 w-[700px] animate-fade-down animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\photo.png"
         alt="" />
      <img
         class="ticket -ml-32 mt-20 animate-fade-left animate-delay-700 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\ticket.png"
         alt="" />
      <img
         class="camera mx-auto ml-44 w-[300px] animate-fade-up animate-delay-500 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\camera.png"
         alt="" />
      <img
         class="case z-10 -ml-4 -mt-32 w-[800px] animate-jump-in animate-delay-[2300ms] animate-normal animate-once animate-ease-in-out"
         src="assets\css\case.png"
         alt="" />
      <img
         class="smallCase animate-delay-1200 mx-auto -ml-8 -mt-10 w-[300px] animate-fade-left animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\smallCase.png"
         alt="" />
   </div>
   <div class="-ml-10 -mt-[600px] h-[600px] overflow-hidden">
      <img
         class="globe h-30 mx-auto w-[2000px] animate-spin overflow-hidden animate-normal animate-duration-[12000ms] animate-infinite animate-ease-linear max-sm:mt-[150px]"
         src="assets\css\globe.png"
         alt="" />
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
