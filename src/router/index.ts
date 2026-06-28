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
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/trade',
      name: 'Trade',
      component: () => import('../views/TradeView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/lostfound',
      name: 'LostFound',
      component: () => import('../views/LostFoundView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/groupbuy',
      name: 'GroupBuy',
      component: () => import('../views/GroupBuyView.vue'),
      meta: { showNav: true },
    },
    {
      path: '/errand',
      name: 'Errand',
      component: () => import('../views/ErrandView.vue'),
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
      path: '/usercenter',
      name: 'UserCenter',
      component: () => import('../views/UserCenterView.vue'),
      meta: { showNav: true },
    },
  ],
})

export default router
