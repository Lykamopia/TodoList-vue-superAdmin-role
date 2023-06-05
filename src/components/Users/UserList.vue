<template>
  <div>
    <ul
      class="flex justify-between py-3 px-4 hover:bg-gray-100 relative cursor-pointer"
    >
      <li class="w-1/12 text-left">{{ sequence }}</li>
      <li class="w-5/12 text-left font-bold text-blue-800 font-mono text-xl">
        {{ name }}
      </li>
      <li class="w-1/5 text-left">{{ id }}</li>
      <li v-if="progress" class="w-1/5 text-left  relative">{{ complete ? "Completed" :"Not Completed" }} <i class="mdi mdi-circle-small text-5xl absolute right-0 -top-3" :class="complete? 'text-green-600' :'text-red-600'"></i></li>
      <li @click="optionEvent" class="cursor-pointer w-1/5 flex justify-end pr-3 relative">
        <div v-if="optionsIsClicked">
          <div
            class="bg-gray-200 absolute right-4 z-20 top-8  w-26 p-1 rounded-md shadow-lg content"
          >
            <span
              @click="$emit('editEvent', true)"
              class="px-3 hover:bg-gray-300 py-2 rounded-md flex justify-between text-blue-800 text-sm"
              >Edit <SimpleLineIconsPencil class="ml-6 mt-1"
            /></span>
            <span
              class="px-3 hover:bg-gray-300 py-2 rounded-md flex justify-between text-red-800 text-sm"
              >Delete <SimpleLineIconsTrash class="ml-2 mt-1" />
            </span>
          </div>
        </div>
        <div class="hover:bg-gray-200 w-9 h-9 rounded-full p-1 transition duration-100 hover:shadow-sm ease-in-out">
          <i class="mdi mdi-dots-horizontal  ml-1.5"></i>
        </div>
      </li>
    </ul>
    <hr />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SimpleLineIconsPencil from "../Icons/SimpleLineIconsPencil.vue";
import SimpleLineIconsTrash from "../Icons/SimpleLineIconsTrash.vue";
const props = defineProps(["id", "name", "sequence","progress","complete"]);
const emits = defineEmits(["optionsClicked"]);
const optionsIsClicked = ref(false);
const optionEvent = () => {
  optionsIsClicked.value = !optionsIsClicked.value;
  emits("optionsClicked", optionsIsClicked.value);
};
</script>

<style scoped>
/* .speech-bubble:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 30px;
  transform: translateX(-20%);
  border-width: 12px;
  border-color: transparent transparent #e2e8f0 transparent;
} */
</style>
