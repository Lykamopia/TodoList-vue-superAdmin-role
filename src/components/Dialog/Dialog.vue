<template>
  <!-- <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open dialog
    </button>
  </div> -->
  
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
                Add User <MaterialSymbolsPersonAddOutlineRounded class="text-black mx-4 text-2xl"/>
              </DialogTitle>
              <div class="mt-2 text-gray-500">
                <span class="flex justify-between my-2">
                  <label for="id" class="cursor-pointer ml-4">Id</label>
                <input class=" w-3/4 p-1 outline-none border rounded-md px-2 border-blue-500" type="text" id="id"> 
                </span>
                <span class="flex justify-between">
                  <label for="username" class="cursor-pointer">User Name </label>
                <input class=" w-3/4 p-1 outline-none border rounded-md px-2 border-blue-500" type="text" id="username"> 
                 </span>
                <p class="text-sm mt-4">
                  <q>The greatest glory in living lies not in never falling, but in rising every time we fall.</q>-Nelson Mandela
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Add
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
import MaterialSymbolsPersonAddOutlineRounded from '../Icons/MaterialSymbolsPersonAddOutlineRounded.vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
const isOpen = ref(false)
const sendToApp = ref(true);
const props = defineProps({
  Open: {
    type: Boolean,
    required: true
  }
});  

watch(() => props.Open, (newVal) => {
      if (newVal) {
          isOpen.value = newVal;
      }
    });

const emits = defineEmits(['closeModal'])
function closeModal() {
  isOpen.value = sendToApp.value = false;
  emits('closeModal',sendToApp.value);
}
</script>
