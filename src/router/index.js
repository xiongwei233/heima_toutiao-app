import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout' // 默认打开首页（layout下的home）
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/layout'),
    // redirect: '/layout/home',
    children: [
      {
        path: '/layout',
        redirect: '/layout/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/search')
  },
  {
    path: '/search_result/:searchValue',
    name: 'SearchResult',
    component: () => import('@/views/search/SearchResult')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/artileDetail')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
