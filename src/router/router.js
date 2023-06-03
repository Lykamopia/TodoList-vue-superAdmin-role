import { createRouter, createWebHistory } from 'vue-router';
import TodoList from "../components/Todos/TodoList.vue"
import NotFound from "../components/NotFound/NotFound.vue"
const routes = [
  {
    path: '/',
    name: 'User',
    component: TodoList
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