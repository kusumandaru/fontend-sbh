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
    path: '/client/project/dr_revision_submission/:id',
    name: 'client-project-dr-revision-submission',
    component: () => import('@/views/client/project/DRRevisionSubmission.vue'),
  },
  {
    path: '/client/project/fa_revision_submission/:id',
    name: 'client-project-fa-revision-submission',
    component: () => import('@/views/client/project/FARevisionSubmission.vue'),
  },
  {
    path: '/client/project/second_payment/:id',
    name: 'client-project-second-payment',
    component: () => import('@/views/client/project/SecondPayment.vue'),
  },
  {
    path: '/client/project/third_payment/:id',
    name: 'client-project-third-payment',
    component: () => import('@/views/client/project/ThirdPayment.vue'),
  },
  {
    path: '/client/project/dr/assesment/:id',
    name: 'client-project-dr-assessment',
    component: () => import('@/views/client/dr/DRList.vue'),
  },
  {
    path: '/client/project/on-site-revision-submission/:id',
    name: 'client-project-on-site-revision-submission',
    component: () => import('@/views/client/project/OnSiteRevisionSubmission.vue'),
  },
  {
    path: '/client/project/fa/assesment/:id',
    name: 'client-project-fa-assessment',
    component: () => import('@/views/client/fa/FAList.vue'),
  },
  {
    path: '/client/project/workshop/sign-post-approval/:id',
    name: 'client-project-sign-post-load-approval',
    component: () => import('@/views/client/project/SignPostAndLoadApprovalSubmission.vue'),
  },
]
