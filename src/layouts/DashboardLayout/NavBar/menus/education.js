import { Folder, FolderPlus, } from 'react-feather'
// eslint-disable-next-line camelcase
import { perm_work_with_program } from 'src/utils/permissions'
import { PROGRAMS_URL, } from 'src/constants'

const createButton = [
  {
    title: 'Create',
    href: `${PROGRAMS_URL}/create`,
    icon: FolderPlus,
  }
]

export const defineEducation = (role) => {
  const canCreate = perm_work_with_program(role) ? createButton : []
  return [
    {
      subheader: 'Education',
      items: [
        {
          title: 'Program List',
          href: `${PROGRAMS_URL}`,
          icon: Folder
        },
        ...canCreate
      ]
    },
  ]
}

export default defineEducation
