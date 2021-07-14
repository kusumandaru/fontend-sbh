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
        route: 'user-list',
        icon: 'UserIcon',
      },
      {
        title: 'Create Project',
        route: 'project-register',
        icon: 'BookIcon',
      },
      {
        title: 'List Project',
        route: 'project-list',
        icon: 'BookIcon',
      },
      {
        title: 'Master Data',
        icon: 'SettingsIcon',
        children: [
          {
            title: 'Master City',
            route: 'city-list',
            icon: 'MapIcon',
          },
          {
            title: 'Master Province',
            route: 'province-list',
            icon: 'MapIcon',
          },
        ],
      },
    ],
  },
]
