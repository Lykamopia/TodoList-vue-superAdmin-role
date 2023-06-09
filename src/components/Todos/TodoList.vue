<template>
  <div class="flex justify-center">
    <Header @filter="handleSearchEvent" :totalCount="TotalNumber" type="Task" :progress="true" :accountName="accountName" :accountId="accountId"/>
    <div class="border rounded-lg shadow-md text-black bg-body h-fit min-h-max container absolute z-10 top-32">
      <Title @showModal="addTriger" :progress="true" :completeTask="countCompleted" :incompleteTask="countIncompleted"/>
      <div v-if="loading" class="w-full h-56 flex flex-col justify-center align-center">
        <SkeletonLoader class="w-full h-12 " />
        <SkeletonLoader class="w-full h-12 mt-2" />
        <SkeletonLoader class="w-full h-12 mt-2" />
        <SkeletonLoader class="w-full h-12 mt-2" />
      </div>
      <div v-else-if="error" class="flex justify-center items-center text-red-900">Something went wrong   <i @click="reload" class="mdi mdi-refresh text-4xl cursor-pointer text-black border m-4 rounded-md hover:bg-blue-100 text-center px-12"></i></div>
      <div v-else-if="SearchedItems.length == 0" class="text-red-700 p-40 text-xl text-center font-bold" >
        The User is Not Found!
      </div>
      <div v-else>
        <div v-for="(value, index) in SearchedItems" :key="index">
          <div v-for="(val, inde) in value.todos" :key="inde">
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
watchEffect(() => {
  if (result.value?.users) {
    fetchedValue.value = result.value.users;
  }
});

const filteredItems = computed(() => {
  if (props.id) {
    return fetchedValue.value.filter((item) => {
      if(props.id == item.id){
        TotalNumber.value = item.todos.length;
        countCompleted.value = item.todos.filter((todo) => todo.completed).length;
        countIncompleted.value = TotalNumber.value - countCompleted.value;
        
        //this is used for account name
        accountName.value = item.name;
        accountId.value = props.id;
      }
   return props.id == item.id
    });
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
};

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
