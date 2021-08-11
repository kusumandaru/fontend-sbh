export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'auth',
      redirectIfLoggedIn: true,
    },
  },
]
