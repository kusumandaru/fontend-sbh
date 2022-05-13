export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/Profile.vue'),
    meta: {
      pageTitle: 'Profile',
      breadcrumb: [
        {
          text: 'Profile',
          active: true,
        },
      ],
      action: 'read',
      resource: 'auth',
    },
  },
  {
    path: '/user/edit',
    name: 'user-edit',
    component: () => import('@/views/user/users-edit/UsersEdit.vue'),
    meta: {
      pageTitle: 'User',
      breadcrumb: [
        {
          text: 'User',
          active: true,
        },
      ],
      action: 'read',
      resource: 'auth',
    },
  },
]
