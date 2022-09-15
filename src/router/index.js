import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* */
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import(/* webpackChunkName: "Profile" */ '@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
