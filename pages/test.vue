<template>
  <div class="grid grid-cols-3 gap-[-4] w-full mx-auto h-[680px] overflow-hidden">
    <!-- 其他圖片放在這裡 -->
    <img
      class=" w-[360px] mx-auto ml-40 animate-fade-right animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-500"
      src="assets\css\wallet.png" alt="">
    <img
      class=" w-[700px] mx-auto -ml-4 animate-fade-down animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-900"
      src="assets\css\photo.png" alt="">
    <img
      class="  -ml-32 mt-20 animate-fade-left animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-700"
      src="assets\css\ticket.png" alt="">
    <img
      class=" w-[300px] mx-auto ml-44  animate-fade-up  animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-500"
      src="assets\css\camera.png" alt="">
    <img
      class="  w-[800px] relative -ml-4 z-20 -mt-32 animate-jump-in animate-once animate-delay-[2300ms] animate-ease-in-out animate-normal"
      src="assets\css\case.png" alt="">
    <img
      class=" w-[300px] mx-auto  -ml-8 -mt-10  animate-fade-left animate-once animate-duration-[2000ms] animate-ease-in-out animate-normal animate-delay-1200"
      src="assets\css\smallCase.png" alt="">
    <div class="absolute top-[205px]   mx-auto">
      <img
        class="w-[1500px] mx-auto animate-spin animate-infinite animate-duration-[12000ms] animate-ease-linear animate-normal"
        src="assets\css\globe.png" alt="">
    </div>
  </div>
</template>
<script>
window.addEventListener("beforeunload", (event) => {
  event.returnValue = "您確定要刷新頁面嗎？";
});

const entries = performance.getEntriesByType("navigation");
</script>