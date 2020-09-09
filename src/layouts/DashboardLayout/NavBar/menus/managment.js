import {
  Users, UserPlus, Layers, Plus,
  Folder, FolderPlus,
  Award,
} from 'react-feather'

import {
  USERS_URL, TOPICS_URL, PROGRAMS_URL, TYPES_URL
} from 'src/constants'
// eslint-disable-next-line camelcase
import { perm_work_with_users } from 'src/utils/permissions'

const usersButton = [
  {
    title: 'Users',
    href: '#',
    icon: Users,
    items: [
      {
        title: 'List Users',
        href: `${USERS_URL}`,
        icon: Users,
      },
      {
        title: 'Create',
        href: `${USERS_URL}/create`,
        icon: UserPlus,
      },
    ]
  }
]

const typesButton = [
  {
    title: 'Types',
    href: '#',
    icon: Award,
    items: [
      {
        title: 'List Types',
        href: `${TYPES_URL}`,
        icon: Award,
      },
      {
        title: 'Create',
        href: `${TYPES_URL}/create`,
        icon: Plus,
      },
    ]
  }
]

export const defineManagment = (role) => {
  const accessToUser = perm_work_with_users(role) ? usersButton : []
  const accessToTypes = role === 'superadmin' ? typesButton : []
  return [
    {
      subheader: 'Managment',
      items: [
        {
          title: 'Programs',
          href: '#',
          icon: Folder,
          items: [
            {
              title: 'My Program',
              href: `${PROGRAMS_URL}`,
              icon: Folder
            },
            {
              title: 'Create',
              href: `${PROGRAMS_URL}/create`,
              icon: FolderPlus,
            },
          ]
        },
        {
          title: 'Topics',
          href: '#',
          icon: Layers,
          items: [
            {
              title: 'Topic List',
              href: `${TOPICS_URL}`,
              icon: Layers,
            },
            {
              title: 'Create',
              href: `${TOPICS_URL}/create`,
              icon: Plus,
            },
          ]
        },
        ...accessToUser,
        ...accessToTypes
      ]
    },
  ]
}

export default defineManagment
