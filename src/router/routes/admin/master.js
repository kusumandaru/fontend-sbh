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
]
