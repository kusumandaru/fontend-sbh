export default [
  {
    path: '/project-add',
    name: 'project-add',
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
      resource: 'client-project',
    },
  },
  {
    path: '/client-project-list',
    name: 'client-project-list',
    component: () => import('@/views/register_project/ClientProjectList.vue'),
    meta: {
      pageTitle: 'List Client Project',
      breadcrumb: [
        {
          text: 'List Client Project',
          active: true,
        },
      ],
      action: 'read',
      resource: 'client-project',
    },
  },
]
