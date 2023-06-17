<template>
    <div class="flex items-center justify-center h-screen text-black">
      <div class="w-1/3 bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4 ">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <span class="text-sm text-red-600">{{ error }}</span>
            <label for="username" class="block font-medium mb-2">Username</label>
            <input type="text" v-model="username" id="username" class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block font-medium mb-2">Password</label>
            <input type="password" v-model="password" id="password" class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="font-ubuntu">
            Testing account <br> <span class="text-sm text-gray-400"> username = check, password = check123</span>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const error = ref('')
  const login = () => {
    if(username.value == "check" && password.value == "check123"){
        router.push({ name: 'users' });
    }
    else{
        error.value="* Incorrect username or password"
    }
  };
  </script>
  
  <style>

  </style>
  