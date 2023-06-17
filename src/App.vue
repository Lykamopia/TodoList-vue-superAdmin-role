<script setup>
</script>
<template>
  <!-- A place where all components get swapped -->
  <router-view />
  <div class="flex text-black justify-evenly items-center mt-4 bg-gray-200 shadow-md">
    <a href="https://github.com/Lykamopia/TodoList" target="_blank" class="mdi mdi-github text-4xl"></a>
    <a href="https://www.figma.com/file/gOAVRri0br5yt8mnEUP4bA/To-do-List?type=design&node-id=0%3A1&t=MeXZ0S4efz2DjpuJ-1" target="_blank">    
      <img src="./assets//figma-icon.png" alt="Figma" class="w-6 h-8 cursor-pointer">
    </a>
  </div>
</template>

<style scoped>
</style>
