import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/IndexView.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'shuffle',
          name: 'shuffle',
          component: () => import('@/views/ShuffleView.vue')
        },
        {
          path: 'members',
          name: 'members',
          component: () => import('@/views/MembersView.vue')
        }
      ]
    }
  ],
  linkExactActiveClass: 'active'
})

export default router
