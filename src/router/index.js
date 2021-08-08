import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/user-list',
      name: 'user-list',
      component: () => import('@/views/User.vue'),
      meta: {
        pageTitle: 'User List',
        breadcrumb: [
          {
            text: 'User List',
            active: true,
          },
        ],
      },
    },
    {
      path: '/project/register',
      name: 'project-register',
      component: () => import('@/views/register_project/ProjectRegister.vue'),
      meta: {
        pageTitle: 'Create Project',
        breadcrumb: [
          {
            text: 'Create Project',
            active: true,
          },
        ],
      },
    },
    {
      path: '/project/list',
      name: 'project-list',
      component: () => import('@/views/register_project/ProjectList.vue'),
      meta: {
        pageTitle: 'List Project',
        breadcrumb: [
          {
            text: 'List Project',
            active: true,
          },
        ],
      },
    },
    {
      path: '/project/preview/:id',
      name: 'project-preview',
      component: () => import('@/views/register_project/ProjectPreview.vue'),
    },
    {
      path: '/client-project-list',
      name: 'client-project-list',
      component: () => import('@/views/register_project/ClientProjectList.vue'),
      meta: {
        pageTitle: 'List Client Project',
        breadcrumb: [
          {
            text: 'List Client Project',
            active: true,
          },
        ],
      },
    },
    {
      path: '/project-add',
      name: 'project-add',
      component: () => import('@/views/register_project/ProjectRegister.vue'),
      meta: {
        pageTitle: 'Create Project',
        breadcrumb: [
          {
            text: 'Create Project',
            active: true,
          },
        ],
      },
    },
    {
      path: '/city-list',
      name: 'city-list',
      component: () => import('@/views/master/CityList.vue'),
      meta: {
        pageTitle: 'List City',
        breadcrumb: [
          {
            text: 'List City',
            active: true,
          },
        ],
      },
    },
    {
      path: '/province-list',
      name: 'province-list',
      component: () => import('@/views/master/ProvinceList.vue'),
      meta: {
        pageTitle: 'List Province',
        breadcrumb: [
          {
            text: 'List Province',
            active: true,
          },
        ],
      },
    },
    {
      path: '/building-type-list',
      name: 'building-type-list',
      component: () => import('@/views/master/BuildingTypeList.vue'),
      meta: {
        pageTitle: 'List Building Type',
        breadcrumb: [
          {
            text: 'List Building Type',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
