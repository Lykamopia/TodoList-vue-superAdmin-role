<template>
  <div>
    <ul
      class="flex justify-between py-3 font-sans px-4 hover:bg-gray-100 relative cursor-pointer"
    >
      <li class="w-1/12 text-left">{{ sequence }}</li>
      <li class="w-5/12 text-left font-bold text-gray-700 text-xl">
        {{ name }}
      </li>
      <li class="w-1/5 text-left ml-8">{{ id }}</li>
      <div v-if="progress" class="w-1/5 flex justify-between flex-wrap">
        <li>
        {{ complete ? "Completed" : "Not Completed" }}
      </li>
      <i class="mdi mdi-circle-small text-5xl text-right -mt-3" :class="complete ? 'text-green-600' : 'text-red-600'"></i>
      </div>
      
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
const REMOVE_TODO = graphqlStore.deleteTodo;
const { mutate: deleteUser } = useMutation(REMOVE_USER,{
    variables : {
    id : props.id
    },
    update: (cache) => {
            const existingData = cache.readQuery({
              query: graphqlStore.fetchedQuery,
            });
            const updatedData = {
              // filtering out the user with its id
              users: existingData.users.filter((user) => user.id !== props.id),
            };
            cache.writeQuery({
              query: graphqlStore.fetchedQuery,
              data: updatedData,
            });
        },
  })
const { mutate: deleteTodos } = useMutation(REMOVE_TODO,{
    variables : {
    id : props.id
    },
    update: (cache) => {
            const existingData = cache.readQuery({
              query: graphqlStore.fetchedQuery,
            });
            const updatedData = {
              // filtering out todo with its respective id
                users: existingData.users.map(user => ({
                  ...user,
                  todos: user.todos.filter(todo => todo.id !== props.id),
                })),
              };
            cache.writeQuery({
              query: graphqlStore.fetchedQuery,
              data: updatedData,
            });
        },
  })

 const deleteEventHandler = () => {
  // deleting todos
  if(props.progress){
    deleteTodos({ variables: { id: props.id } });
  }
  // deleting user
  else if (!props.progress) {
    deleteUser({ variables: { id: props.id } });
}
 }

 const editEventHandler = () => {
  emits("editEvent",true);
  emits("idEvent",props.id);
  graphqlStore.setId(props.id);
  graphqlStore.setName(props.name);
  graphqlStore.setCompleted(props.complete);
 }

  const optionsIsClicked = ref(false);
  const optionEvent = () => {
  optionsIsClicked.value = !optionsIsClicked.value;
  emits("optionsClicked", optionsIsClicked.value);
};
</script>

<style scoped></style>
