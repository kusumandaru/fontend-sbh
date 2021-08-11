export default [
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
      action: 'manage',
      resource: 'project',
    },
  },
  {
    path: '/client/project',
    name: 'client-project',
    component: () => import('@/views/register_project/ProjectList.vue'),
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
    component: () => import('@/views/register_project/ProjectPreview.vue'),
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
]
