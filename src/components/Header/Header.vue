<template>
  <nav
    class="h-44 bg-primaryNavColor w-full justify-evenly flex relative flex-wrap"
  >
    <div class="flex h-fit">
      <h1 class="text-3xl font-bold">{{ type }}</h1>
      <div class="mx-16 mt-2 relative">
        <button>
          <i class="mdi mdi-magnify absolute -left-6 top-1 cursor-pointer"></i>
        </button>
        <input
          class="outline-none border-b-2 bg-primaryNavColor"
          type="text"
          name="search"
          id="search"
          v-model="searchText"
          @input="searchEvent"
          placeholder="Search" 
        />
      </div>
    </div>
    <div class="h-fit">
    <h1 class="text-4xl font-bold">To-do List</h1>
    <h1 class="text-countColor text-sm">Total: {{ totalCount }} {{ type }}</h1>
  </div>
    <div v-if="progress" class="h-fit">
    <i class="mdi mdi-bell-badge text-xl mx-3 cursor-pointer"></i>
    <i class="mdi mdi-email text-xl cursor-pointer"></i>
    <i @mouseenter="isHovered = true" @mouseleave="isHovered = false"  class="mdi mdi-account-circle text-xl ml-3 mr-1 cursor-pointer"></i> <span class="font-sans font-thin">{{ accountName }} </span> 
    <div v-if="isHovered" class="relative">
      <div  class=" absolute bg-white h-26 z-40 transition ease-in-out duration-300 rounded-lg shadow-lg">
        <div class="m-2 flex flex-wrap cursor-pointer rounded-t-md  text-left">
            <i class="mdi mdi-account-badge-outline text-6xl w-fit text-blue-900  cursor-pointer"></i>
            <span class="font-sans font-bold text-xl text-gray-700">{{ props.accountName }}</span>
            <span class="text-gray-700 text-sm  absolute right-4 top-8">@id: {{props.accountId}}</span>
        </div>
            <span class="font-sans text-md m-2 text-gray-600 ml-12 text-center font-medium">Stay safe</span>
    </div>
    </div>

  </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["totalCount", "type","name","progress","accountName","accountId"]);
const searchText = ref("");
const isHovered = ref(false);
const  emits  = defineEmits(["filter"]);
const searchEvent = () => {
  emits("filter", searchText.value);
};
</script>

<style scoped>
nav {
  width: 100%;
  padding: 20px 30px;
}
</style>
