import { createRouter, createWebHistory } from 'vue-router';
import TodoList from "../components/Todos/TodoList.vue"
import NotFound from "../components/NotFound/NotFound.vue"
import View from "../components/View.vue";
import Login from "../components/Login/Login.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: View,
  },
  {
    path: '/users/:id',
    name: 'TodoList',
    component: TodoList,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;