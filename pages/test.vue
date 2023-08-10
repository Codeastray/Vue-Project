<template>
   <div class="mx-auto grid h-[680px] w-full grid-cols-3 gap-[-4] overflow-hidden">
      <!-- 其他圖片放在這裡 -->
      <img
         class="mx-auto ml-40 w-[360px] animate-fade-right animate-delay-500 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\wallet.png"
         alt="" />
      <img
         class="animate-delay-900 mx-auto -ml-4 w-[700px] animate-fade-down animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\photo.png"
         alt="" />
      <img
         class="-ml-32 mt-20 animate-fade-left animate-delay-700 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\ticket.png"
         alt="" />
      <img
         class="mx-auto ml-44 w-[300px] animate-fade-up animate-delay-500 animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\camera.png"
         alt="" />
      <img
         class="relative z-20 -ml-4 -mt-32 w-[800px] animate-jump-in animate-delay-[2300ms] animate-normal animate-once animate-ease-in-out"
         src="assets\css\case.png"
         alt="" />
      <img
         class="animate-delay-1200 mx-auto -ml-8 -mt-10 w-[300px] animate-fade-left animate-normal animate-duration-[2000ms] animate-once animate-ease-in-out"
         src="assets\css\smallCase.png"
         alt="" />
      <div class="absolute top-[205px] mx-auto">
         <img
            class="mx-auto w-[1500px] animate-spin animate-normal animate-duration-[12000ms] animate-infinite animate-ease-linear"
            src="assets\css\globe.png"
            alt="" />
      </div>
   </div>
</template>
<script>
   window.addEventListener('beforeunload', event => {
      event.returnValue = '您確定要刷新頁面嗎？'
   })

   const entries = performance.getEntriesByType('navigation')
</script>
