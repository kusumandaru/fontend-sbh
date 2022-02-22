export default [
  {
    path: '/admin/master/city',
    name: 'admin-city-list',
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
    path: '/admin/master/city/:cityId/edit',
    name: 'admin-city-edit',
    component: () => import('@/views/admin/master/CityEdit.vue'),
    meta: {
      pageTitle: 'Update City Type',
      breadcrumb: [
        {
          text: 'List City Type',
          to: '/admin/master/city',
        },
        {
          text: 'Update City Type',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/province',
    name: 'admin-province-list',
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
    path: '/admin/master/province/:provinceId/edit',
    name: 'admin-province-edit',
    component: () => import('@/views/admin/master/ProvinceEdit.vue'),
    meta: {
      pageTitle: 'Update Province Type',
      breadcrumb: [
        {
          text: 'List Province Type',
          to: '/admin/master/province',
        },
        {
          text: 'Update Province Type',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/building-type',
    name: 'admin-building-type-list',
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
    path: '/admin/master/building-type/:buildingId/edit',
    name: 'admin-building-edit',
    component: () => import('@/views/admin/master/BuildingEdit.vue'),
    meta: {
      pageTitle: 'Update Building Type',
      breadcrumb: [
        {
          text: 'List Building Type',
          to: '/admin/master/building-type',
        },
        {
          text: 'Update Building Type',
          active: true,
        },
      ],
      action: 'read',
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
    component: () => import('@/views/admin/master/VendorList.vue'),
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
    path: '/admin/master/vendor/:vendorId/edit',
    name: 'admin-vendor-edit',
    component: () => import('@/views/admin/master/VendorEdit.vue'),
    meta: {
      pageTitle: 'Update Vendor',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'Update Vendor',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates',
    name: 'admin-template-list',
    component: () => import('@/views/admin/master/TemplateList.vue'),
    meta: {
      pageTitle: 'List Template',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
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
    path: '/admin/master/vendor/:vendorId/templates/:templateId/edit',
    name: 'admin-template-edit',
    component: () => import('@/views/admin/master/TemplateEdit.vue'),
    meta: {
      pageTitle: 'Update Template',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'Update Vendor',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/building_document/:buildingDocumentId/edit',
    name: 'admin-building-document-edit',
    component: () => import('@/views/admin/master/BuildingDocumentEdit.vue'),
    meta: {
      pageTitle: 'Update Building Document',
      breadcrumb: [
        {
          text: 'List Building Document',
          to: '/admin/master/building_document',
        },
        {
          text: 'Update Building Document',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations',
    name: 'admin-evaluation-list',
    component: () => import('@/views/admin/master/EvaluationList.vue'),
    meta: {
      pageTitle: 'List Evaluation',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
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
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/edit',
    name: 'admin-evaluation-edit',
    component: () => import('@/views/admin/master/EvaluationEdit.vue'),
    meta: {
      pageTitle: 'Update Evaluation',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'Update Evaluation',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises',
    name: 'admin-exercise-list',
    component: () => import('@/views/admin/master/ExerciseList.vue'),
    meta: {
      pageTitle: 'List Exercise',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
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
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/edit',
    name: 'admin-exercise-edit',
    component: () => import('@/views/admin/master/ExerciseEdit.vue'),
    meta: {
      pageTitle: 'Update Exercise',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
        },
        {
          text: 'Update Exercise',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/criterias',
    name: 'admin-criteria-list',
    component: () => import('@/views/admin/master/CriteriaList.vue'),
    meta: {
      pageTitle: 'List Criteria',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
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
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/criterias/:criteriaId/edit',
    name: 'admin-criteria-edit',
    component: () => import('@/views/admin/master/CriteriaEdit.vue'),
    meta: {
      pageTitle: 'Update Criteria',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
        },
        {
          text: 'List Criteria',
        },
        {
          text: 'Update Exercise',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/criterias/:criteriaId/documents',
    name: 'admin-document-list',
    component: () => import('@/views/admin/master/DocumentList.vue'),
    meta: {
      pageTitle: 'List Document',
      breadcrumb: [
        {
          text: 'List Template',
          to: '/admin/master/vendors/:vendorId/templates',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
        },
        {
          text: 'List Criteria',
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
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/criterias/:criteriaId/documents/:documentId/edit',
    name: 'admin-document-edit',
    component: () => import('@/views/admin/master/DocumentEdit.vue'),
    meta: {
      pageTitle: 'Update Document',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
        },
        {
          text: 'List Criteria',
        },
        {
          text: 'List Document',
        },
        {
          text: 'Update Document',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
  {
    path: '/admin/master/vendor/:vendorId/templates/:templateId/evaluations/:evaluationId/exercises/:exerciseId/criterias/:criteriaId/blockers/',
    name: 'admin-blocker-correlation',
    component: () => import('@/views/admin/master/BlockerCorrelation.vue'),
    meta: {
      pageTitle: 'Blocker Correlation',
      breadcrumb: [
        {
          text: 'List Vendor',
          to: '/admin/master/vendor',
        },
        {
          text: 'List Template',
        },
        {
          text: 'List Evaluation',
        },
        {
          text: 'List Exercise',
        },
        {
          text: 'List Criteria',
        },
        {
          text: 'List Document',
        },
        {
          text: 'Blocker Correlation',
          active: true,
        },
      ],
      action: 'read',
      resource: 'master',
    },
  },
]
