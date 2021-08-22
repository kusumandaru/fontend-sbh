export default [
  {
    path: '/admin/project/list',
    name: 'project-list',
    component: () => import('@/views/admin/project/List.vue'),
    meta: {
      pageTitle: 'List Project',
      breadcrumb: [
        {
          text: 'List Project',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'project',
    },
  },
  {
    path: '/admin/project/preview/:id',
    name: 'project-preview',
    component: () => import('@/views/admin/project/Preview.vue'),
  },
]
