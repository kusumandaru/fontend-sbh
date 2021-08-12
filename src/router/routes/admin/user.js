export default [
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
      action: 'manage',
      resource: 'user',
    },
  },
]