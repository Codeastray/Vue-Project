<template>
   <div class="overflow-x-clip">
      <NavBar class="sticky top-0 z-20 bg-white" />
      <div class="container mx-auto w-full">
         <SearchBar class="sticky top-32 z-10 my-2 bg-transparent max-sm:top-[203px]" />
         <div class="container mx-auto w-full">
            <slot />
         </div>
      </div>
   </div>
</template>

<script setup></script>

<style scoped></style>
