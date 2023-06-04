import { createApp ,provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo/ApolloClient';
import { createPinia } from 'pinia'; 
import router from './router/router';
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'

createApp(App).use(createPinia()).use(router).provide(DefaultApolloClient, apolloClient).mount('#app')
