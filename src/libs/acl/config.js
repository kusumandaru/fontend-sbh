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
      subject: 'project',
    },
    {
      action: 'manage',
      subject: 'user',
    },
    {
      action: 'manage',
      subject: 'master',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  user: [
    {
      action: 'manage',
      subject: 'client-project',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
  superuser: [
    {
      action: 'manage',
      subject: 'client-project',
    },
    {
      action: 'manage',
      subject: 'client-admin',
    },
    {
      action: 'read',
      resource: 'home',
    },
  ],
}

export const _ = undefined
