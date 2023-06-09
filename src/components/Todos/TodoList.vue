<template>
  <div class="flex justify-center">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Task" :progress="true" :accountName="accountName" :accountId="accountId"/>
    <div class="border rounded-lg shadow-md text-black bg-body h-fit min-h-max container absolute z-10 top-32">
      <Title @showModal="addTriger" :progress="true" :completeTask="countCompleted" :incompleteTask="countIncompleted" @completedTask="completedTaskFilter" @AllItemEvent="AllItemHandler" @sortById="sortById" @sortByTitle="sortByTitle"/>
      <div v-if="loading" class="w-full h-56 flex flex-col justify-center align-center">
        <SkeletonLoader class="w-full h-12 " />
        <SkeletonLoader class="w-full h-12 mt-2" />
        <SkeletonLoader class="w-full h-12 mt-2" />
        <SkeletonLoader class="w-full h-12 mt-2" />
      </div>
      <div v-else-if="error" class="flex justify-center items-center text-red-900">Something went wrong   <i @click="reload" class="mdi mdi-refresh text-4xl cursor-pointer text-black border m-4 rounded-md hover:bg-gray-100 text-center px-12"></i></div>
      <div v-else-if="SearchedItems.length == 0" class="text-red-700  p-9 text-xl text-center font-bold" >
        Task Not Found!
      </div>
      <div v-else>
          <div v-for="(val, inde) in  SearchedItems " :key="inde">
            <UserList
              @editEvent="editTriger"
              :id="val.id"
              :name="val.title"
              :sequence="inde + 1"
              :progress="true"
              :complete="val.completed"
            />
          </div>
      </div>
    </div>
    <Dialog :Open="addBtnClicked" @closeModal="showModal" :progress="true" :type="modalType" :id="id"/>
  </div>
</template>

<script setup>
import Header from "../Header/Header.vue";
import UserList from "../Users/UserList.vue";
import Dialog from "../Dialog/Dialog.vue";
import Title from "../Header/Title.vue";
import SkeletonLoader from "../Loader/SkeletonLoader.vue";
import { ref, watchEffect, computed } from "vue";
import { useGraphQLStore } from "../../store/GraphQlStore";
const graphqlStore = useGraphQLStore();
const { result , error ,loading,refetch} = graphqlStore.fetchedData;
const props = defineProps(['id']);
const fetchedValue = ref([]);
const TotalNumber = ref(0);
const searchText = ref("");
const addBtnClicked = ref(false);
const countCompleted = ref(0);
const countIncompleted = ref(0);
const modalType = ref('');
const accountName = ref('');
const accountId = ref('');
const ProgressFilterdArray = ref([]);
const isProgressFilterd = ref('');
watchEffect(() => {
  if (result.value?.users) {
    fetchedValue.value = result.value.users;
    if(props.id){
      fetchedValue.value.filter((item)=>{
      if(props.id == item.id){
        ProgressFilterdArray.value = item.todos;
        TotalNumber.value = item.todos.length;
        countCompleted.value = item.todos.filter((todo) => todo.completed).length;
        countIncompleted.value = TotalNumber.value - countCompleted.value;

        //this is used for account name
        accountName.value = item.name;
        accountId.value = props.id;
      }
    })
    }
  }
});

// filtering todos by searching with search_text

const SearchedItems = computed(() => {
  if (searchText.value !== "") {
    const lowercaseSearchText = searchText.value.toLowerCase();
    return ProgressFilterdArray.value.filter((item) => {
      return item.title.toLowerCase().startsWith(lowercaseSearchText);
    });
  } else {
    return ProgressFilterdArray.value;
  }
});

// search input text

const handleSearchEvent = (data) => {
  searchText.value = data;
};

// filtering completed and incomplete tasks 

const completedTaskFilter = (data) => {
  if (data) {
    isProgressFilterd.value = true;
     fetchedValue.value.filter((item) => {
      if(props.id == item.id){
        ProgressFilterdArray.value = item.todos.filter((todo) => todo.completed);
      }
    });
    console.log(ProgressFilterdArray.value[0]);
  }
  else{
    isProgressFilterd.value = false;
     fetchedValue.value.filter((item) => {
      if(props.id == item.id){
        ProgressFilterdArray.value = item.todos.filter((todo) => !todo.completed);
      }
    });
    console.log(ProgressFilterdArray.value);
  }
}

// all_item navigation

const AllItemHandler = (data) => {
  if(data){
    if(props.id){
      fetchedValue.value.filter((item)=>{
      if(props.id == item.id){
        ProgressFilterdArray.value = item.todos;
      }
    })
    }
  }
}

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
    const sortedArray = ProgressFilterdArray.value.slice().sort((a, b) => a.title.localeCompare(b.title));
    console.log(sortedArray)
    ProgressFilterdArray.value = sortedArray;
    return sortedArray;
  }
}

// showing input modal
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
const reload = () => {
  location.reload();
}

</script>

<style scoped>
.container {
  width: 80%;
}
</style>
