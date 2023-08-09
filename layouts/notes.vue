<template>
  <div class=" overflow-x-clip">
    <NavBar class="sticky top-0 bg-white z-20" />
    <div class=" container w-full mx-auto ">
        <SearchBar class="my-2 sticky top-32 bg-transparent z-10 max-sm:top-[203px]" />
        <div class=" container w-full mx-auto ">
            <slot />
        </div>
    </div>
</div>
</template>
  
<script setup>

</script>
  
<style scoped></style>