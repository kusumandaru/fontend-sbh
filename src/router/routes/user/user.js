export default [
  {
    path: '/client/user/list',
    name: 'client-user-list',
    component: () => import('@/views/client/user/List.vue'),
    meta: {
      pageTitle: 'List User',
      breadcrumb: [
        {
          text: 'List User',
          active: true,
        },
      ],
      action: 'read',
      resource: 'client-project',
    },
  },
  {
    path: '/client/user/:userId/edit',
    name: 'client-user-edit',
    component: () => import('@/views/client/user/UserEdit.vue'),
    meta: {
      pageTitle: 'User Edit',
      breadcrumb: [
        {
          text: 'User Edit',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'client-project',
    },
  },
]
