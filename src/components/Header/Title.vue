<template>
  <div class="flex justify-between font-medium pt-6 px-6">
        <span class="flex text-gray-500">
          <h1 class="mr-12 cursor-pointer" @click="displayAllUser">All Users</h1>
          <h1  class="cursor-pointer"  @click="displayAllUser">New Users</h1>
        </span>
        <button
          @click="$emit('showModal',true)"
          class="bg-primaryNavColor rounded-full text-white px-4 relative w-32 text-left"
        >
          <b class="text-4xl">+</b
          ><span class="absolute top-2 right-4">Add User</span>
        </button>
   </div>
      <ul class="flex justify-between mt-2 bg-gray-200 py-3 px-4 font-bold">
        <li class="w-1/12 text-left ">#</li>
        <li class="w-5/12 text-left flex">{{ }} <SolarClipboardCheckLineDuotone class="ml-2 mt-1"/> </li>
        <li class="w-1/5 text-left">ID</li>
        <li v-if="progress" class="w-1/5 text-left">Progress</li>
        <li class="w-1/5 flex justify-end">Option <SimpleLineIconsSettings class="ml-2 mt-1"/></li>
      </ul>
</template>

<script setup>
import SimpleLineIconsSettings from '../Icons/SimpleLineIconsSettings.vue';
import SolarClipboardCheckLineDuotone from '../Icons/SolarClipboardCheckLineDuotone.vue';
const props = defineProps(['progress']);
</script>

<style>

</style>