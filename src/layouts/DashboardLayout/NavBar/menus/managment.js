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
    title: 'menu.users',
    href: '#',
    icon: Users,
    items: [
      {
        title: 'menu.users',
        href: `${USERS_URL}`,
        icon: Users,
      },
      {
        title: 'menu.createUser',
        href: `${USERS_URL}/create`,
        icon: UserPlus,
      },
    ]
  }
]

const typesButton = [
  {
    title: 'menu.types',
    href: '#',
    icon: Award,
    items: [
      {
        title: 'menu.types',
        href: `${TYPES_URL}`,
        icon: Award,
      },
      {
        title: 'menu.createType',
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
      subheader: 'menu.managment',
      items: [
        {
          title: 'menu.programs',
          href: '#',
          icon: Folder,
          items: [
            {
              title: 'menu.myProgram',
              href: `${PROGRAMS_URL}`,
              icon: Folder
            },
            {
              title: 'menu.createProgram',
              href: `${PROGRAMS_URL}/create`,
              icon: FolderPlus,
            },
          ]
        },
        {
          title: 'menu.topics',
          href: '#',
          icon: Layers,
          items: [
            {
              title: 'menu.topics',
              href: `${TOPICS_URL}`,
              icon: Layers,
            },
            {
              title: 'menu.createTopic',
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
