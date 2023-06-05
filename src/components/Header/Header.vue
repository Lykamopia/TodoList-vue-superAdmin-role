<template>
  <nav
    class="h-56 bg-primaryNavColor w-full justify-between flex pl-16 relative flex-wrap"
  >
    <div class="flex">
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
    <h1 class="text-4xl font-bold -mt-8">To-do List</h1>
    <h1 class="text-countColor text-sm -mt-8">Total: {{ totalCount }} {{ type }}</h1>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["totalCount", "type"]);
const searchText = ref("");
const  emits  = defineEmits(["filter"]);
const searchEvent = () => {
  emits("filter", searchText.value);
};
</script>

<style scoped>
nav {
  width: 100%;
  padding: 40px 60px;
}
</style>
