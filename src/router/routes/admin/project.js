export default [
  {
    path: '/admin/project/list',
    name: 'admin-project-list',
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
    name: 'admin-project-preview',
    component: () => import('@/views/admin/project/Preview.vue'),
  },
  {
    path: '/admin/project/first_payment/:id',
    name: 'admin-project-first-payment',
    component: () => import('@/views/admin/project/AgreementFirstPayment.vue'),
  },
]
