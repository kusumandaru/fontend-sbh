export default [
  {
    path: '/project/list',
    name: 'project-list',
    component: () => import('@/views/admin/project/ProjectList.vue'),
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
    path: '/project/preview/:id',
    name: 'project-preview',
    component: () => import('@/views/admin/project/ProjectPreview.vue'),
  },
  {
    path: '/building-type-list',
    name: 'building-type-list',
    component: () => import('@/views/admin/master/BuildingTypeList.vue'),
    meta: {
      pageTitle: 'List Building Type',
      breadcrumb: [
        {
          text: 'List Building Type',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'master',
    },
  },
]
