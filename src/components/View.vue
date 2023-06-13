<script setup>
import UserList from "./Users/UserList.vue";
import { watchEffect ,ref, computed ,onMounted} from "vue";
import Header from "./Header/Header.vue";
import Dialog from "./Dialog/Dialog.vue";
import Title from "./Header/Title.vue";
import { useGraphQLStore } from "../store/GraphQlStore";
import { ListLoader } from 'vue-content-loader';

const graphqlStore = useGraphQLStore();
const { result , error ,loading ,refetch} = graphqlStore.fetchedData;

const fetchedValue = ref([]);
const ProgressFilterdArray = ref([]);
const addBtnClicked = ref(false);
const TotalNumber = ref("");
const searchText = ref("");
const optionButton = ref(false);
const userInputs = ref('');
const modalType = ref('');

const showModal = () => {
  addBtnClicked.value = !addBtnClicked.value;
};
const editTriger = () => {
  modalType.value = 'Edit';
  showModal();
}
const addTriger = () => {
  modalType.value = 'Add';
  showModal();
}
const handleSearchEvent = (data) => {
  searchText.value = data;
  console.log(searchText.value);
};
const handleOptionEvent = (data) => {
  if (data) {
    optionButton.value = !optionButton.value;
  }
};
// onMounted(() => {
//       refetch();
//     });
watchEffect(() => {
  if (result?.value?.users) {
    fetchedValue.value = result?.value?.users;
    graphqlStore.setFetchedResult(fetchedValue.value);
    TotalNumber.value = fetchedValue.value.length;
    ProgressFilterdArray.value = fetchedValue.value;
  }
});
const filteredItems = computed(() => {
  if (searchText.value) {
    const lowercaseSearchText = searchText.value.toLowerCase();
    return ProgressFilterdArray.value.filter((item) =>
      item.name.toLowerCase().startsWith(lowercaseSearchText)
    );
  } else {
    return ProgressFilterdArray.value;
  }
});

// sorting by todo id

const sortById = (data) => {
  if (data === 'id') {
    const sortedArray = ProgressFilterdArray.value.slice().sort((a, b) => a.id - b.id);
    console.log(sortedArray)
    ProgressFilterdArray.value = sortedArray;
    return sortedArray;
  }
};

// sorting by todo title

const sortByTitle = (data) => {
  if (data === 'title') {
    const sortedArray = ProgressFilterdArray.value.slice().sort((a, b) => a.name.localeCompare(b.name));
    console.log(sortedArray)
    ProgressFilterdArray.value = sortedArray;
    return sortedArray;
  }
}


const reload = () => {
  location.reload();
}

</script>
<template>
  <div class="flex justify-center flex-wrap">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Users" :progress="false"/>
    <div
      class=" border rounded-lg drop-shadow-md text-black bg-body container z-10 -mt-12 "
    >
      <Title @showModal="addTriger" :progress="false" @sortById="sortById" @sortByTitle="sortByTitle"/>      
      <div v-if="loading" class="w-full h-56 flex flex-col justify-center align-center">
        <ListLoader :list-style="'rows'" :row="6" :row-width="[800, 850, 700,750,600,650]" />
      </div>
      <div v-else-if="error" class="flex justify-center items-center text-red-900"><i class="mdi mdi-alert-circle-outline text-4xl text-red-700 mx-4"></i> Something went wrong   <i @click="reload" class="mdi mdi-refresh text-4xl cursor-pointer text-black border m-4 rounded-md hover:bg-gray-100 text-center px-12"></i></div>
      <div v-else-if="filteredItems.length == 0" class="text-red-700 p-9 text-xl text-center font-bold">User Not Found!</div>
      <div v-else>
        <div v-for="(single, index) in filteredItems" :key="index" class="relative">
        <router-link :to="{ name: 'TodoList', params: { id: single.id } }">
            <span  class="absolute z-40 bg-transparent	w-1/4 h-12 left-12"></span>
        </router-link>
        <UserList :userInputs="userInputs" @editEvent="editTriger" @optionsClicked="handleOptionEvent" :id="single.id" :name="single.name" :sequence="index + 1" :progress="false"/>
        </div>
      </div>
    </div>
    <Dialog :totalCount="TotalNumber" :Open="addBtnClicked" @closeModal="showModal" :type="modalType" :progress="false"/>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
}
</style>
