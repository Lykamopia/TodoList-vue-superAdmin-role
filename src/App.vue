<script setup>
import UserList from "./components/Users/UserList.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { watchEffect } from "vue";
import { ref , computed } from "vue";
import Header from "./components/Header/Header.vue";
import Dialog from "./components/Dialog/Dialog.vue";
import SkeletonLoader from "./components/Loader/SkeletonLoader.vue"
import SimpleLineIconsSettings from "./components/Icons/SimpleLineIconsSettings.vue"
import SolarClipboardCheckLineDuotone from "./components/Icons/SolarClipboardCheckLineDuotone.vue";
const { result, loading } = useQuery(gql`
  query MyQuery @cached {
    users {
      id
      name
      todos {
        completed
        id
        title
      }
    }
  }
`);
const fetchedValue = ref([]);
const addBtnClicked = ref(false);
const TotalNumber = ref("");
const searchText = ref('');
const optionButton = ref(false);
const isArrayEmpty = ref(false);

const showModal = () => {
 if (!addBtnClicked.value) {
    addBtnClicked.value = true;
  }
}

const closeModalHandler = (data) => {
  addBtnClicked.value = data;
}

const handleSearchEvent = (data) => {
  searchText.value = data;
  console.log(searchText.value);
    }

const handleOptionEvent = (data) => {
  if(data){
    optionButton.value = !optionButton.value;
  }
}
watchEffect(() => {
  if (result.value?.users) {
    fetchedValue.value = result.value.users;
    TotalNumber.value = fetchedValue.value.length;
  }
});

const filteredItems = computed(() => {
  if (searchText.value != '') {
    const lowercaseSearchText = searchText.value.toLowerCase();
    return fetchedValue.value.filter((item) => item.name.toLowerCase().startsWith(lowercaseSearchText));
  }else {
    return fetchedValue.value;
  }
});

const getUserDetailRoute = (userId, detail) => {
  return {
    name: "page1Detail",
    params: {
      id: userId,
      detail,
    },
  };
};
const textColor = ref('black');
const displayAllUser = () => {
  textColor.value = textColor.value === 'grey' ? 'blue' : 'grey';
  return fetchedValue.value;
}
</script>
<template>
  <div class="flex justify-center">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Users" />
    <!-- The main table -->
    <div
      class="border rounded-lg shadow-md text-black bg-body h-fit min-h-max container absolute z-10 top-32"
    >
      <div class="flex justify-between font-medium pt-6 px-6">
        <span class="flex text-gray-500">
          <h1 :style="{ color: textColor }" class="mr-12 cursor-pointer" @click="displayAllUser">All Users</h1>
          <h1  class="cursor-pointer"  @click="displayAllUser">New Users</h1>
        </span>
        <button
          @click="showModal"
          class="bg-primaryNavColor rounded-full text-white px-4 relative w-32 text-left"
        >
          <b class="text-4xl">+</b
          ><span class="absolute top-2 right-4">Add User</span>
        </button>
      </div>
      <ul class="flex justify-between mt-2 bg-gray-200 py-3 px-4 font-bold">
        <li class="w-1/12 text-left">#</li>
        <li class="w-5/12 text-left flex">User Name <SolarClipboardCheckLineDuotone class="ml-2 mt-1"/> </li>
        <li class="w-1/4 text-left">ID</li>
        <li class="w-1/4 flex justify-end">Option <SimpleLineIconsSettings class="ml-2 mt-1"/></li>
      </ul>
      <div v-if="loading" class="w-full h-56 flex flex-col justify-center align-center">
        <SkeletonLoader class="w-full mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
        <SkeletonLoader class="w-full h-36 mt-2" />
      </div>
      <div v-else-if="filteredItems.length == 0" class="text-red-700 p-40 text-xl text-center font-bold">The User is Not Found!</div>
      <div v-else>
        <div v-for="(single, index) in filteredItems" :key="index">
          <UserList @editEvent="showModal" @optionsClicked="handleOptionEvent" :id="single.id" :name="single.name" :sequence="index + 1" />
        </div>
      </div>
    </div>
    <Dialog :Open="addBtnClicked" @closeModal="closeModalHandler" class=""/>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
}

span.active {
  color: red;
}
</style>
