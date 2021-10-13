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
  {
    path: '/admin/project/second_payment/:id',
    name: 'admin-project-second-payment',
    component: () => import('@/views/admin/project/SecondPayment.vue'),
  },
  {
    path: '/admin/project/workshop/:id',
    name: 'admin-project-workshop',
    component: () => import('@/views/admin/project/Workshop.vue'),
  },
  {
    path: '/admin/project/dr/assesment/:id',
    name: 'admin-project-dr-assesment',
    component: () => import('@/views/admin/dr/Faq.vue'),
  },
]
