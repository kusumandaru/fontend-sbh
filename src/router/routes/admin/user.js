export default [
  {
    path: '/admin/user/list',
    name: 'admin-user-list',
    component: () => import('@/views/admin/user/List.vue'),
    meta: {
      pageTitle: 'List User',
      breadcrumb: [
        {
          text: 'List User',
          active: true,
        },
      ],
      action: 'read',
      resource: 'admin-user-list',
    },
  },
  {
    path: '/admin/user/:userId/edit',
    name: 'admin-user-edit',
    component: () => import('@/views/admin/user/UserEdit.vue'),
    meta: {
      pageTitle: 'User Edit',
      breadcrumb: [
        {
          text: 'User Edit',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'admin-user-list',
    },
  },
]
