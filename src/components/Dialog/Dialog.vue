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
              <i class="mdi text-6xl" :class="type === 'Edit'? 'mdi-account-edit' : 'mdi-account-plus' "></i> <br>  {{type}} User 
              <!-- account-edit -->
              </DialogTitle>
              <div class="mt-2 text-gray-500">
                <span class="flex justify-between my-2">
                  <label for="id" class="cursor-pointer">Id</label>
                  <input class=" w-3/4 p-1 outline-none border rounded-md px-2 border-blue-500" type="number" v-model="inputId"  id="id"> 
                </span>
                <span class="flex justify-between">
                  <label for="username" class="mt-1 cursor-pointer">User Name </label>
                <input class=" w-3/4 p-1 outline-none border rounded-md px-2 border-blue-500" type="text" v-model="inputUsername" id="username"> 
                 </span>
                 <span v-if="progress" class="flex justify-between">
                  <label for="progress" class="mt-2 cursor-pointer">Progress </label>
                <input class=" w-3/4 p-1 mt-2 outline-none border rounded-md px-2 border-blue-500" type="text" id="progress">
                 </span>
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
const { mutate: updateUsers } = useMutation(UPDATE_USER);
const { mutate: insertUsers } = useMutation(graphqlStore.insertedData);

const isOpen = ref(false)
const sendToApp = ref(true);
const inputUsername = ref('');
const inputId = ref('');
const props = defineProps(['Open','totalCount',"progress","type"]);  
watch(() => props.Open, (newVal) => {
      if (newVal) {
          isOpen.value = newVal;
      }
      if(!props.progress &&  props.type === 'Edit' && isOpen.value){
        // This is to add previous values into the input fields
            inputUsername.value = graphqlStore.name;
            inputId.value = graphqlStore.id;
      }
      else if(!isOpen.value){
        // When the Dialog closes the input fields reset
        inputUsername.value = '';
        inputId.value = '';       
      }
    });
// 

const emits = defineEmits(['closeModal','userInput'])
function closeModal() {
  isOpen.value = sendToApp.value = false;
  emits('closeModal',sendToApp.value);
}
const addInput = () =>{
  if(props.type === 'Add'){
    // graphqlStore.addUser(inputUsername.value)
    insertUsers({
    "name" : inputUsername.value,
  }),
    console.log("This is from header Add btn");
  }
  else if(props.type === 'Edit'){
  const id = parseInt(graphqlStore.id, 10);
  const newId = parseInt(inputId.value);
  const newName = inputUsername.value;
    updateUsers({
          id: id,
          idd: newId,
          name: newName
        })
    .then((result) => {
      console.log("User updated:", result.data.update_users_by_pk);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
  }
  const inputs = {
    id : inputId.value,
    name : inputUsername.value,
    type: props.type
  }
  emits('userInput',inputs);
  isOpen.value = false;
}
</script>
