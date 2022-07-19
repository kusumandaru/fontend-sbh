export const initialAbility = [
  {
    action: 'read',
    subject: 'auth',
  },
]

export const roleAbility = {
  'camunda-admin': [
    {
      action: 'manage',
      subject: 'admin-project-list',
    },
    {
      action: 'manage',
      subject: 'admin-self-project-list',
    },
    {
      action: 'manage',
      subject: 'admin-user-list',
    },
    {
      action: 'manage',
      subject: 'admin-master-data',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  admin: [
    {
      action: 'manage',
      subject: 'admin-project-list',
    },
    {
      action: 'manage',
      subject: 'admin-user-list',
    },
    {
      action: 'manage',
      subject: 'admin-self-project-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  verificator: [
    {
      action: 'manage',
      subject: 'admin-project-list',
    },
    {
      action: 'manage',
      subject: 'verificator-self-project-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  owner: [
    {
      action: 'manage',
      subject: 'client-project-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  viewer: [
    {
      action: 'manage',
      subject: 'client-project-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  user: [
    {
      action: 'manage',
      subject: 'client-project-register',
    },
    {
      action: 'manage',
      subject: 'client-project-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  superuser: [
    {
      action: 'manage',
      subject: 'client-project-register',
    },
    {
      action: 'manage',
      subject: 'client-project-list',
    },
    {
      action: 'manage',
      subject: 'client-user-list',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
}

export const _ = undefined
