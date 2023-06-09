<template>
  <div>
  <div class="flex justify-between relative font-medium pt-6 px-6">
    <i
      v-if="progress"
      @click="goBack"
      class="mdi mdi-arrow-left absolute text-3xl text-gray-500 hover:bg-gray-100 transition ease-in delay-75 cursor-pointer rounded-full px-1 bottom-1"
    ></i>
    <span class="flex text-gray-500">
      <button
      @click="AllItemHandler"
        class="ml-12 mr-2 h-fit rounded-t-md hover:bg-gray-100 transition ease-in delay-75 cursor-pointer text-center px-4"
        :class="(!completedBtn && !IncompletedBtn)? 'border-b-2 border-primaryNavColor' : ''"
      >
        All {{ title1 }}s
      </button>
      <div v-if="sortBtn || filterBtn" @click="sortBtn = false, filterBtn=false"  class="fixed w-screen z-20 h-screen left-0 top-0"></div>
      <div class="relative">
        <button @click="sort" class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md transition ease-in delay-75 h-fit transition text-center px-4">
          sort by<i class="mdi" :class="sortBtn?'mdi-chevron-up ':'mdi-chevron-down'"></i>
        </button>
        <div v-if="sortBtn" class="bg-gray-200 absolute z-20 w-28 p-1 rounded-md shadow-lg content">
          <span @click="sortByIdhandler" class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm">ID</span>
          <span @click="sortByTitleHandler" class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm">{{ title2 }}</span>
        </div>
      </div>
      <!-- filtering -->
      <div v-if="progress" class="relative">
        <button
          @click="filterHadnler"
          class="mr-2 cursor-pointer hover:bg-gray-100 rounded-t-md  transition ease-in delay-75 h-fit transition text-center px-4"
          :class="[completedBtn ? 'border-b-2  border-green-500' : '', IncompletedBtn ? 'border-b-2  border-red-500' : '']"
        >
          Filter by<i class="mdi" :class="filterBtn?'mdi-chevron-up ':'mdi-chevron-down'"></i>
        </button>
        <div
          v-if="filterBtn"
          class="bg-gray-200 absolute z-20 w-28 p-1 rounded-md shadow-lg content"
        >
          <span
          @click="completed"
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >Completed</span
          >
          <span
          @click="incompleted"
            class="px-3 cursor-pointer hover:bg-gray-300 py-2 rounded-md flex justify-between text-sm"
            >Incomplete</span
          >
        </div>
      </div>
      <!--  -->
    </span>
    <button
      @click="$emit('showModal', true)"
      class="bg-primaryNavColor rounded-full text-white px-2 relative w-24 text-center"
      @mouseenter="isHovered = true" @mouseleave="isHovered = false" 
    >
      <b class="text-4xl">+</b>
      <span v-if="isHovered" class="absolute -top-7 rounded-md  bg-gray-800 text-white font-bold text-sm right-0 w-24">Add {{ title1 }}</span>
    </button>
  </div>
  <span class="flex mt-2 bg-white w-full h-2 " :class="progress?'bg-gray-400':'bg-transparent'">
        <div class="anim bg-green-600 h-2  rounded-l-md" :style="{ width: fillWidth }" :title="props.completeTask"></div>
        <div class="anim2 bg-red-600 h-2 rounded-r-md" :style="{ width: fillWidth2 }" :title="props.incompleteTask"></div>
  </span>

  <ul class="flex justify-between  bg-gray-200 py-3 px-4 font-bold">
    <li class="w-1/12 text-left">#</li>
    <li class="w-5/12 text-left flex">
      {{progress? 'Task' : 'User'}} <i class="mdi text-xl" :class="progress? 'mdi-checkbox-marked-circle-auto-outline' : 'mdi-account-circle-outline' "></i> 
    </li>
    <li class="w-1/5 text-left">ID</li>
    <li v-if="progress" class="w-1/5 relative text-left ">
      Progress <i class="mdi mdi-progress-check text-xl"></i> 
    </li>
    <li class="w-1/5 flex justify-end flex-wrap">
      Option <i class="mdi mdi-cog ml-2 text-xl"></i> 
    </li>
  </ul>
</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref , computed } from "vue";
const router = useRouter();
const props = defineProps(["progress","completeTask","incompleteTask"]);
const emits = defineEmits(["completedTask","AllItemEvent","sortById","sortByTitle"])

const title1 = ref("");
const title2 = ref("")
const sortBtn = ref(false);
const filterBtn = ref(false);
const completedBtn = ref(false);
const IncompletedBtn = ref(false);
const isHovered = ref(false);
// the graph for complete and incomplete tasks
const fillWidth = computed(() =>
  `${(props.completeTask / (props.completeTask + props.incompleteTask)) * 100}%`
);
const fillWidth2 = computed(() =>
  `${(props.incompleteTask / (props.completeTask + props.incompleteTask)) * 100}%`
);

if (props.progress) {
  title1.value = "Task";
  title2.value = "Title";
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
const completed = () => {
  emits("completedTask",true);
  completedBtn.value = true;
  IncompletedBtn.value=false;
  filterBtn.value = false;
}
const incompleted = () => {
  emits("completedTask",false);
  IncompletedBtn.value=true;
  completedBtn.value = false;
  filterBtn.value = false;
}
const AllItemHandler = () => {
 emits("AllItemEvent",true);
  completedBtn.value =false;
  IncompletedBtn.value =false;
}
const sortByIdhandler = () => {
  emits('sortById', 'id');
  sortBtn.value = false;
}
const sortByTitleHandler = () => {
  emits('sortByTitle', 'title');
  sortBtn.value = false;
}
</script>

<style scoped>
.anim{
  animation: fillAnimation 2s ease-out forwards;
}
.anim2{
  animation: fillAnimation2 2s ease-in-out forwards;
}
@keyframes fillAnimation {
  0% {
    width: 0%;
  }
  100% {
    width: '';
  }
}
@keyframes fillAnimation2 {
  0% {
    width: 0%;
  }
  100% {
    width: '';
  }
}

</style>

