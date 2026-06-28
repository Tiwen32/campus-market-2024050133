import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showNav: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { showNav: false },
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/ListView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../views/DetailView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/publish',
      name: 'Publish',
      component: () => import('../views/PublishView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/MessageView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('../views/BoardView.vue'),
      meta: { showNav: true },
    },
  ],
})

export default router
