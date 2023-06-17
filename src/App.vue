<script setup>
</script>
<template>
  <!-- A place where all components get swapped -->
  <router-view />
  <div class="fixed text-black  shadow-md h-24 top-64">
    <a href="https://github.com/Lykamopia/TodoList" target="_blank" class="mdi mdi-github text-4xl m-3"></a>
    <a href="https://www.figma.com/file/gOAVRri0br5yt8mnEUP4bA/To-do-List?type=design&node-id=0%3A1&t=MeXZ0S4efz2DjpuJ-1" target="_blank" class="m-4">    
      <img src="./assets//figma-icon.png" alt="Figma" class="w-6 h-8 cursor-pointer m-3 ml-4">
    </a>
  </div>
</template>

<style scoped>
</style>
