<script setup>
import UserList from "./Users/UserList.vue";
import { useQuery } from "@vue/apollo-composable";
import { watchEffect ,ref, computed } from "vue";
import Header from "./Header/Header.vue";
import Dialog from "./Dialog/Dialog.vue";
import SkeletonLoader from "./Loader/SkeletonLoader.vue";
import Title from "./Header/Title.vue";
import { useGraphQLStore } from "../store/GraphQlStore";
const graphqlStore = useGraphQLStore();
const query = graphqlStore.fetchedData;
const { result, loading , error} = useQuery(query);

const fetchedValue = ref([]);
const addBtnClicked = ref(false);
const TotalNumber = ref("");
const searchText = ref("");
const optionButton = ref(false);

const showModal = () => {
  if (!addBtnClicked.value) {
    addBtnClicked.value = true;
  }
  else{
    addBtnClicked.value = false;
  }
};

const handleSearchEvent = (data) => {
  searchText.value = data;
  console.log(searchText.value);
};

const handleOptionEvent = (data) => {
  if (data) {
    optionButton.value = !optionButton.value;
  }
};

watchEffect(() => {
  if (result.value?.users) {
    fetchedValue.value = result.value.users;
    TotalNumber.value = fetchedValue.value.length;
  }
});

const filteredItems = computed(() => {
  if (searchText.value != "") {
    const lowercaseSearchText = searchText.value.toLowerCase();
    return fetchedValue.value.filter((item) =>
      item.name.toLowerCase().startsWith(lowercaseSearchText)
    );
  } else {
    return fetchedValue.value;
  }
});
const reload = () => {
  location.reload();
}
</script>
<template>
  <div class="flex justify-center">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Users" />
    <div
      class="border rounded-lg shadow-md text-black bg-body h-fit min-h-max container absolute z-10 top-32"
    >
      <Title @showModal="showModal" :progress="false"/>      
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
      <div v-else-if="error" class="flex justify-center items-center text-red-900">Something went wrong   <i @click="reload" class="mdi mdi-refresh text-4xl cursor-pointer text-black border m-4 rounded-md hover:bg-blue-100 text-center px-12"></i></div>
      <div v-else-if="filteredItems.length == 0" class="text-red-700 p-40 text-xl text-center font-bold">The User is Not Found!</div>
      <div v-else>
        <div v-for="(single, index) in filteredItems" :key="index">
        <router-link :to="{ name: 'TodoList', params: { id: single.id } }">
            <UserList @editEvent="showModal" @optionsClicked="handleOptionEvent" :id="single.id" :name="single.name" :sequence="index + 1" :progress="false"/>
        </router-link>
        </div>
      </div>
    </div>
    <Dialog :Open="addBtnClicked" @closeModal="showModal" class=""/>
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
