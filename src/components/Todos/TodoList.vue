<template>
  <div class="flex justify-center">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Task" />
    <div
      class="border rounded-lg shadow-md text-black bg-body h-fit min-h-max container absolute z-10 top-32"
    >
      <Title @showModal="showModal" :progress="true" />
      <div
        v-if="loading"
        class="w-full h-56 flex flex-col justify-center align-center"
      >
        <SkeletonLoader class="w-full h-6 " />
        <SkeletonLoader class="w-full h-6 mt-2" />
        <SkeletonLoader class="w-full h-6 mt-2" />
      </div>
      <div
        v-else-if="filteredItems.length == 0"
        class="text-red-700 p-40 text-xl text-center font-bold"
      >
        The User is Not Found!
      </div>
      <div v-else>
        <div v-for="(value, index) in SearchedItems" :key="index">
          <div v-for="(val, inde) in value.todos" :key="inde">
            <UserList
              @editEvent="showModal"
              :id="val.id"
              :name="val.title"
              :sequence="inde + 1"
              :progress="true"
              :complete="val.completed"
            />
          </div>
        </div>
      </div>
    </div>
    <Dialog :Open="addBtnClicked" @closeModal="showModal" class=""/>
  </div>
</template>

<script setup>
import Header from "../Header/Header.vue";
import UserList from "../Users/UserList.vue";
import Dialog from "../Dialog/Dialog.vue";
import Title from "../Header/Title.vue";
import SkeletonLoader from "../Loader/SkeletonLoader.vue";
import { useQuery , useSubscription } from "@vue/apollo-composable";
import { ref, watchEffect, computed } from "vue";
import { useGraphQLStore } from "../../store/GraphQlStore";
const graphqlStore = useGraphQLStore();
const query = graphqlStore.fetchedData;
const { result, loading } = useSubscription(query);

const props = defineProps(['id']);
const fetchedValue = ref([]);
const TotalNumber = ref("");
const searchText = ref("");
const addBtnClicked = ref(false);
watchEffect(() => {
  if (result.value?.users) {
    fetchedValue.value = result.value.users;
  }
});

const filteredItems = computed(() => {
  if (props.id) {
    return fetchedValue.value.filter((item) => props.id == item.id);
  } else {
    return [];
  }
});

const SearchedItems = computed(() => {
  if (searchText.value != "") {
    const lowercaseSearchText = searchText.value.toLowerCase();
    return filteredItems.value.filter((item) => {
      return item.todos.some((todo) =>
        todo.title.toLowerCase().startsWith(lowercaseSearchText)
      );
    });
  } else {
    return filteredItems.value;
  }
});

const handleSearchEvent = (data) => {
  searchText.value = data;
  console.log(searchText.value);
};

const showModal = () => {
  if (!addBtnClicked.value) {
    addBtnClicked.value = true;
  }
  else{
    addBtnClicked.value = false;
  }
};
</script>

<style scoped>
.container {
  width: 80%;
}
</style>
