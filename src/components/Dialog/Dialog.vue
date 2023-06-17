<template>  
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative  z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-none">
        <div
          class="flex h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-xl font-bold leading-6 text-gray-900 flex justify-center mb-8"
              >
              <i v-if="!progress" class="mdi text-6xl" :class="type === 'Edit'? 'mdi-account-edit' : 'mdi-account-plus' "></i>  
              <i v-if="progress" class="mdi text-6xl" :class="type === 'Edit'? 'mdi-circle-edit-outline' : 'mdi-checkbox-marked-circle-plus-outline' "></i> <br> 
               {{type}}  {{ progress ? 'Task' : 'User' }} 
              </DialogTitle>
              <div class="mt-2 text-gray-500">
                <span class="flex justify-between">
                  <label v-if="!progress" for="username" class="mt-1 cursor-pointer">User Name </label>
                  <label v-if="progress" for="username" class="mt-1 cursor-pointer">Task</label>
                <input class=" w-3/4 p-1 outline-none border rounded-md px-2 " :class="Inputerror ?'border-red-500 motion-safe:animate-bounce':'border-blue-500'" type="text" v-model="inputUsername" id="username" @input="removeError" @keyup.enter="addInput"> 
                 </span>
                 <span v-if="progress" class="flex justify-between">
                  <label for="progress" class="mt-2 cursor-pointer">Progress </label>
                  <select v-model="inputProgress" class="w-3/4 p-1 outline-none border rounded h-8 mt-2 cursor-pointer" :class="Inputerror ?'border-red-500':'border-blue-500'" name="" id="progress">
                    <option class="border-none" :value="false">In-completed</option>
                    <option class="border-green" :value="true">Completed</option>
                  </select>
                 </span>
                 <p v-if="Inputerror" class="text-sm text-red-500 text-center">{{ Inputerror }}</p>
                <p class="text-sm mt-4">
                  <q>The greatest glory in living lies not in never falling, but in rising every time we fall.</q>-Nelson Mandela
                </p>
              </div>
              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="addInput"
                >
                  {{type}}
                  
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mx-4"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref , watch } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useGraphQLStore } from "../../store/GraphQlStore";
import { useMutation } from "@vue/apollo-composable";
const graphqlStore = useGraphQLStore();
const UPDATE_USER = graphqlStore.updatedUser;
const INSERT_USER = graphqlStore.insertedData;
const UPDATE_TODO = graphqlStore.updateTodo;
const INSERT_TODO = graphqlStore.insertTodo;
const { mutate: updateUsers } = useMutation(UPDATE_USER);
const { mutate: updateTodos } = useMutation(UPDATE_TODO);

// inserting and caching a new user
const { mutate: insertUsers } = useMutation(INSERT_USER,{
        update: (cache, { data }) => {
          const existingData = cache.readQuery({
            query:  graphqlStore.fetchedQuery,
          });
          const newUser = {
            id: data.insert_users_one.id,
            name: data.insert_users_one.name,
            todos: [],
          };
          const updatedData = {
            users: [...existingData.users, newUser],
          };
          cache.writeQuery({
            query: graphqlStore.fetchedQuery,
            data: updatedData,
          });
        },
      }
      );
      // insering and caching a new todo 
const { mutate: insertTodos } = useMutation(INSERT_TODO,{
        update: (cache, { data }) => {
          const existingData = cache.readQuery({
            query:  graphqlStore.fetchedQuery,
          });
          const newTodo = {
            id: data.insert_todos_one.id,
            title: data.insert_todos_one.title,
            completed: data.insert_todos_one.completed,
            userid : data.insert_todos_one.userid,
          };
          const updatedData = {
                  users: existingData.users.map(user => {
                    if (user.id === data.insert_todos_one.userid) {
                      return {
                        ...user,
                        todos: [...user.todos, newTodo],
                      };
                    }
                    return user;
                  }),
                };
          cache.writeQuery({
            query: graphqlStore.fetchedQuery,
            data: updatedData,
          });
        },
      });


const isOpen = ref(false)
const sendToApp = ref(true);
const inputUsername = ref('');
const inputId = ref('');
const inputProgress = ref(false);
const Inputerror = ref('');
const props = defineProps(['Open','totalCount',"progress","type","id"]);  
watch(() => props.Open, (newVal) => {
      if (newVal) {
          isOpen.value = newVal;
      }
      if(props.type === 'Edit' && isOpen.value){
        // This is to add previous values into the input fields
            inputUsername.value = graphqlStore.name;
            inputId.value = graphqlStore.id;
            inputProgress.value = graphqlStore.completed;
      }
      else if(!isOpen.value){
        // When the Dialog closes the input fields reset
        inputUsername.value = '';
        inputId.value = '';       
      }
    });

const emits = defineEmits(['closeModal','userInput'])
function closeModal() {
  // closing the modal
  Inputerror.value='';
  isOpen.value = sendToApp.value = false;
  emits('closeModal',sendToApp.value);
}
const addInput = () =>{
  // Validating the inputs
  if (!inputUsername.value.trim()) {
    Inputerror.value = '* All input fields are required!';
        return;
    }
  //adding users from Users Header Add Btn
  if(props.type === 'Add' && !props.progress){
    insertUsers({
    "name" : inputUsername.value,
  })
  }
  // updating users from Users Edit Btn
  else if(props.type === 'Edit' && !props.progress){
  console.log("This is from Users edit button")
  const id = parseInt(graphqlStore.id, 10);
  const newId = parseInt(inputId.value);
  const newName = inputUsername.value;
    updateUsers({
          id: id,
          idd: newId,
          name: newName
        })
  }
// updating todos from Todos Edit Btn
  else if(props.type === 'Edit' && props.progress){
  const id = parseInt(graphqlStore.id, 10);
  const newName = inputUsername.value;
  updateTodos({
          oldid: id,
          title: newName,
          completed : inputProgress.value
        })
  }
// inserting todos 
  else if(props.type === 'Add' && props.progress){
    insertTodos({
    "userid": props.id,
    "title" : inputUsername.value,
    "completed" : inputProgress.value
  })
  }
  const inputs = {
    id : inputId.value,
    name : inputUsername.value,
    type: props.type
  }
  emits('userInput',inputs);
  isOpen.value = false;
}
const removeError = () => {
  Inputerror.value='';
}
</script>
