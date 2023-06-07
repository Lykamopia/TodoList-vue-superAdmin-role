<template>
  <div>
    <ul
      class="flex justify-between py-3 font-sans px-4 hover:bg-gray-100 relative cursor-pointer"
    >
      <li class="w-1/12 text-left">{{ sequence }}</li>
      <li class="w-5/12 text-left font-bold text-gray-700 text-xl">
        {{ name }}
      </li>
      <li class="w-1/5 text-left">{{ id }}</li>
      <li v-if="progress" class="w-1/5 text-left relative">
        {{ complete ? "Completed" : "Not Completed" }}
        <i
          class="mdi mdi-circle-small text-5xl absolute right-0 -top-3"
          :class="complete ? 'text-green-600' : 'text-red-600'"
        ></i>
      </li>
      <li
        @click="optionEvent"
        class="cursor-pointer w-1/5 flex justify-end pr-3 relative"
      >
        <div v-if="optionsIsClicked">
          <div
            class="bg-gray-200 absolute right-4 z-20 top-8 w-26 p-1 rounded-md shadow-lg content"
          >
            <span
              @click="editEventHandler"
              class="px-3 hover:bg-gray-300 py-2 rounded-md flex justify-between text-blue-800 text-sm"
              >Edit <i class="mdi mdi-pencil"></i
            ></span>
            <span
              @click="deleteEventHandler"
              class="px-3 hover:bg-gray-300 py-2 rounded-md flex justify-between text-red-800 text-sm"
              >Delete <i class="mdi mdi-delete ml-2"></i>
            </span>
          </div>
        </div>
        <div
          class="hover:bg-gray-200 w-9 h-9 rounded-full pt-1 pl-1 border transition duration-100 hover:shadow-sm ease-in-out"
        >
          <i class="mdi mdi-dots-horizontal ml-1.5"></i>
        </div>
      </li>
    </ul>
    <hr />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useGraphQLStore } from "../../store/GraphQlStore";

const graphqlStore = useGraphQLStore();
const props = defineProps(["id", "name","sequence","progress","complete","userInputs"]);
const emits = defineEmits(["optionsClicked","editEvent","idEvent"]);
const REMOVE_USER = graphqlStore.deletedData;

const { mutate: deleteUser } = useMutation(REMOVE_USER,{
    variables : {
    id : props.id
    },
  })

 const deleteEventHandler = () => {
  if(props.progress)
  console.log("delete is clilcked from todo")
  else if (!props.progress) {
    deleteUser({ variables: { id: props.id } });
    console.log(" deleted user with id "+props.id);
}
 }

 const editEventHandler = () => {
  emits("editEvent",true);
  emits("idEvent",props.id);
  graphqlStore.setId(props.id);
  graphqlStore.setName(props.name);
  console.log(graphqlStore.id,graphqlStore.name)
  console.log(props.userInputs)
  if(props.progress){
    console.log("Edit button is clicked from todos")
  }
  else{
    console.log("Edit button is clicked from users");
  }
 }

const optionsIsClicked = ref(false);
const optionEvent = () => {
  optionsIsClicked.value = !optionsIsClicked.value;
  emits("optionsClicked", optionsIsClicked.value);
};
</script>

<style scoped></style>
