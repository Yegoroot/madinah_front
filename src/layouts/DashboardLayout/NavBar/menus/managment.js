import {
  Users, UserPlus, Layers, Plus, Paperclip,
  Folder, FolderPlus,
} from 'react-feather'

import {
  USERS_URL, TOPICS_URL, NOTES_URL, PROGRAMS_URL
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

export const defineManagment = (role) => {
  console.log(role)
  const accessToUser = perm_work_with_users(role) ? usersButton : []
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
              title: 'List Program',
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
              title: 'List Topics',
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
        {
          title: 'Notes',
          href: '#',
          icon: Paperclip,
          items: [
            {
              title: 'List Notes',
              href: `${NOTES_URL}`,
              icon: Paperclip,
            },
            {
              title: 'Create',
              href: `${NOTES_URL}/create`,
              icon: Plus,
            },
          ]
        },
        ...accessToUser,
      ]
    },
  ]
}

export default defineManagment
