export default [
  {
    path: '/project/register',
    name: 'project-register',
    component: () => import('@/views/client/project/Register.vue'),
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
    component: () => import('@/views/client/project/ClientProjectList.vue'),
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
