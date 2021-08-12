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
]
