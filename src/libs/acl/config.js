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
      action: 'manage',
      subject: 'dashboard',
    },
  ],
  user: [
    {
      action: 'manage',
      subject: 'client-project',
    },
    {
      action: 'read',
      subject: 'dashboard',
    },
  ],
}

export const _ = undefined
