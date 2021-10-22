export default [
  {
    path: '/admin/master/city',
    name: 'city-list',
    component: () => import('@/views/admin/master/CityList.vue'),
    meta: {
      pageTitle: 'List City',
      breadcrumb: [
        {
          text: 'List City',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/province',
    name: 'province-list',
    component: () => import('@/views/admin/master/ProvinceList.vue'),
    meta: {
      pageTitle: 'List Province',
      breadcrumb: [
        {
          text: 'List Province',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/building-type',
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
  {
    path: '/admin/master/admin-data',
    name: 'admin-data',
    component: () => import('@/views/admin/master/AdminData.vue'),
    meta: {
      pageTitle: 'Admin Data',
      breadcrumb: [
        {
          text: 'Admin Data',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/admin-data/edit',
    name: 'admin-data-edit',
    component: () => import('@/views/admin/master/AdminDataEdit.vue'),
    meta: {
      pageTitle: 'Admin Data Edit',
      breadcrumb: [
        {
          text: 'Admin Data Edit',
          active: true,
        },
      ],
      action: 'manage',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor',
    name: 'admin-vendor-list',
    component: () => import('@/views/admin/master/MasterVendor.vue'),
    meta: {
      pageTitle: 'List Vendor',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:id',
    name: 'admin-template-list',
    component: () => import('@/views/admin/master/MasterTemplate.vue'),
    meta: {
      pageTitle: 'List Template',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
        {
          text: 'List Template',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/template/:id',
    name: 'admin-evaluation-list',
    component: () => import('@/views/admin/master/MasterEvaluation.vue'),
    meta: {
      pageTitle: 'List Evaluation',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
        {
          text: 'List Template',
          active: true,
        },
        {
          text: 'List Evaluation',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/evaluation/:id',
    name: 'admin-exercise-list',
    component: () => import('@/views/admin/master/MasterExercise.vue'),
    meta: {
      pageTitle: 'List Exercise',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
        {
          text: 'List Template',
          active: true,
        },
        {
          text: 'List Evaluation',
          active: true,
        },
        {
          text: 'List Exercise',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/exercise/:id',
    name: 'admin-criteria-list',
    component: () => import('@/views/admin/master/MasterCriteria.vue'),
    meta: {
      pageTitle: 'List Criteria',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
        {
          text: 'List Template',
          active: true,
        },
        {
          text: 'List Evaluation',
          active: true,
        },
        {
          text: 'List Exercise',
          active: true,
        },
        {
          text: 'List Criteria',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/document/:id',
    name: 'admin-document-list',
    component: () => import('@/views/admin/master/MasterDocument.vue'),
    meta: {
      pageTitle: 'List Document',
      breadcrumb: [
        {
          text: 'List Vendor',
          active: true,
        },
        {
          text: 'List Template',
          active: true,
        },
        {
          text: 'List Evaluation',
          active: true,
        },
        {
          text: 'List Exercise',
          active: true,
        },
        {
          text: 'List Criteria',
          active: true,
        },
        {
          text: 'List Document And Blcoker',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
]
