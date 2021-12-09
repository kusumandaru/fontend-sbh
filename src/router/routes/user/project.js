export default [
  {
    path: '/client/project/register',
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
    path: '/client/project/list',
    name: 'client-project-list',
    component: () => import('@/views/client/project/List.vue'),
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
  {
    path: '/client/project/preview/:id',
    name: 'client-project-preview',
    component: () => import('@/views/client/project/Preview.vue'),
  },
  {
    path: '/client/project/edit/:id',
    name: 'client-project-edit',
    component: () => import('@/views/client/project/EditProject.vue'),
  },
  {
    path: '/client/project/upload/:id',
    name: 'client-project-upload-document',
    component: () => import('@/views/client/project/UploadDocument.vue'),
  },
  {
    path: '/client/project/first_payment/:id',
    name: 'client-project-first-payment',
    component: () => import('@/views/client/project/FirstPayment.vue'),
  },
  {
    path: '/client/project/dr/assesment/:id',
    name: 'client-project-dr-assessment',
    component: () => import('@/views/client/dr/DRList.vue'),
  },
]
