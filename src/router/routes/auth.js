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
  {
    path: '/invitation/:id',
    name: 'auth-invitation',
    component: () => import('@/views/auth/Invitation.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'auth',
      redirectIfLoggedIn: false,
    },
  },
  {
    path: '/reset_password/:id',
    name: 'auth-reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      layout: 'full',
      action: 'read',
      resource: 'auth',
      redirectIfLoggedIn: true,
    },
  },
]
