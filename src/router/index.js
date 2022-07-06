import Vue from 'vue'
import VueRouter from 'vue-router'
import { getStorage } from '@/util/storage'
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
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/layout',
    name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout'),
    // redirect: '/layout/home',
    children: [
      {
        path: '/layout',
        redirect: '/layout/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
        meta: {
          scrollTValue: 0 // 保存首页离开时，滚动条的位置
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '@/views/search')
  },
  {
    path: '/search_result/:searchValue',
    name: 'SearchResult',
    component: () =>
      import(
        /* webpackChunkName: "SearchResult" */ '@/views/search/SearchResult'
      )
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "artileDetail" */ '@/views/artileDetail')
  },
  {
    path: '/user_edit',
    name: 'UserEdit',
    component: () =>
      import(/* webpackChunkName: "userEdit" */ '@/views/user/userEdit')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat')
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})
// 路由-全局前置守卫（在路由发生真正跳转之前，执行此函数
// 此函数可以决定路由是否跳转/取消/强制中断切换到别的路由
router.beforeEach((to, from, next) => {
  // 有token, 不能去登录页
  // 无token, 需要用户"权限"的才需要去登录页
  if (getStorage('geek-itheima')?.length >= 0 && to.path === '/login') {
    next('/layout/home') // 跳转到home
  } else {
    next() // 其他情况放行
  }
})
export default router
