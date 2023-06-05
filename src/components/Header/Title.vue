<template>
  <div>
  <div class="flex justify-between relative font-medium pt-6 px-6">
    <i
      v-if="progress"
      @click="goBack"
      class="mdi mdi-arrow-left absolute text-3xl text-gray-500 hover:bg-gray-100 transition ease-in delay-75 cursor-pointer rounded-full px-1 bottom-1"
    ></i>
    <span class="flex text-gray-500">
      <h1
        class="ml-12 mr-2 h-8 rounded-t-md hover:bg-gray-100 border-b-2 border-primaryNavColor transition ease-in delay-75 cursor-pointer text-center px-4"
      >
        All {{ title1 }}s
      </h1>
      <h1
        class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-8 transition text-center px-4"
      >
        New {{ title1 }}
      </h1>
      <h1
        v-if="progress"
        class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-8 transition text-center px-4"
      >
        Completed
      </h1>
      <h1
        v-if="progress"
        class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-8 transition text-center px-4"
      >
        Not-Completed
      </h1>
      <div class="relative">
        <h1
          @click="sort"
          class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-8 transition text-center px-4"
        >
          sort by<i class="mdi" :class="sortBtn?'mdi-chevron-up ':'mdi-chevron-down'"></i>
        </h1>
        <div
          v-if="sortBtn"
          class="bg-gray-200 absolute z-20 w-28 p-1 rounded-md shadow-lg content"
        >
          <span
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >ID</span
          >
          <span
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >{{ title2 }}</span
          >
        </div>
      </div>

      <div v-if="progress" class="relative">
        <h1
          @click="filterHadnler"
          class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-8 transition text-center px-4"
        >
          Filter by<i class="mdi" :class="sortBtn?'mdi-chevron-up ':'mdi-chevron-down'"></i>
        </h1>
        <div
          v-if="filterBtn"
          class="bg-gray-200 absolute z-20 w-28 p-1 rounded-md shadow-lg content"
        >
          <span
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >Completed</span
          >
          <span
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >Incomplete</span
          >
        </div>
      </div>
      <!--  -->
    </span>
    <button
      @click="$emit('showModal', true)"
      class="bg-primaryNavColor rounded-full text-white px-4 relative w-32 text-left"
    >
      <b class="text-4xl">+</b
      ><span class="absolute top-2 right-4">Add {{ title1 }}</span>
    </button>
  </div>
  <span v-if="progress" class="flex mt-2 bg-gray-400 w-full h-2">
        <div class="anim bg-green-600 h-2  rounded-r-md"></div>
        <div class="anim2 bg-red-600 h-2 rounded-l-md"></div>
  </span>
  <ul class="flex justify-between  bg-gray-200 py-3 px-4 font-bold">
    <li class="w-1/12 text-left">#</li>
    <li class="w-5/12 text-left flex">
      {{}} <i class="mdi text-xl" :class="progress? 'mdi-checkbox-marked-circle-auto-outline' : 'mdi-account-circle-outline' "></i> 
    </li>
    <li class="w-1/5 text-left">ID</li>
    <li v-if="progress" class="w-1/5 relative text-left">
      Progress <i class="mdi mdi-progress-check text-xl"></i> <i class="mdi mdi-circle-small text-5xl absolute right-0 -top-3"></i>
    </li>
    <li class="w-1/5 flex justify-end">
      Option <i class="mdi mdi-cog ml-2 text-xl"></i> 
    </li>
  </ul>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps(["progress"]);
const title1 = ref("");
const title2 = ref("")
const sortBtn = ref(false);
const filterBtn = ref(false)
if (props.progress) {
  title1.value = "Task";
  title2.value = "Title"
} else {
  title1.value = "User";
  title2.value = "Username"
}
const goBack = () => {
  router.go(-1);
};
const sort = () => {
  sortBtn.value = !sortBtn.value;
};
const filterHadnler = () => {
  filterBtn.value = !filterBtn.value;
}
</script>

<style scoped>
.anim{
  animation: fillAnimation 2s ease-in-out forwards;
}
.anim2{
  animation: fillAnimation2 2s ease-in-out forwards;
}
@keyframes fillAnimation {
  0% {
    width: 0%;
  }
  100% {
    width: 75%;
  }
}
@keyframes fillAnimation2 {
  0% {
    width: 0%;
  }
  100% {
    width: 25%;
  }
}
</style>

