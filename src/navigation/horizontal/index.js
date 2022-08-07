export default [
  {
    header: 'Pages',
    icon: 'FileIcon',
    children: [
      {
        title: 'Home',
        route: 'home',
        icon: 'HomeIcon',
      },
      {
        title: 'User List',
        route: 'admin-user-list',
        icon: 'UserIcon',
      },
      {
        title: 'Create Project',
        route: 'project-register',
        icon: 'BookIcon',
      },
      {
        title: 'List Project',
        route: 'admin-project-list',
        icon: 'BookIcon',
      },
      {
        title: 'List Project',
        route: 'client-project-list',
        icon: 'BookIcon',
      },
      {
        title: 'List User',
        route: 'client-user-list',
        icon: 'BookIcon',
      },
      {
        title: 'Master Data',
        icon: 'SettingsIcon',
        children: [
          {
            title: 'Master Vendor',
            route: 'admin-vendor-list',
            icon: 'MapIcon',
          },
          {
            title: 'Master City',
            route: 'admin-city-list',
            icon: 'MapIcon',
          },
          {
            title: 'Master Province',
            route: 'admin-province-list',
            icon: 'MapIcon',
          },
          {
            title: 'Master Building Type',
            route: 'admin-building-type-list',
            icon: 'MapIcon',
          },
          {
            title: 'Admin Data',
            route: 'admin-data',
            icon: 'MapIcon',
          },
        ],
      },
    ],
  },
]
