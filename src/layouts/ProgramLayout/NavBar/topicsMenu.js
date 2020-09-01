import {
  Folder as FolderIcon,
  User as UserIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather'

import { PUBLIC_PROGRAMS_URL } from 'src/constants'

const initialMenu = [{
  subheader: 'menu.manage.program',
  items: [
    {
      title: 'Back to Programs',
      icon: ArrowLeftIcon,
      href: `${PUBLIC_PROGRAMS_URL}`
    }
  ]
}]

const additionalMenu = [{
  subheader: 'Account',
  href: '/app/account',
  items: [
    {
      title: 'Account',
      href: '/app/account',
      icon: UserIcon
    },
  ]
}]

const notesMenu = (notes, programId, topicId) => {
  if (!notes.length) {
    return null
  }
  return notes.map(({ title, id }) => ({

    title,
    href: `${PUBLIC_PROGRAMS_URL}/${programId}/topics/${topicId}/notes/${id}`,
  }
  ))
}

const topicsMenu = (topics) => {
  const programId = topics[0].program.id
  const programTitle = topics[0].program.title
  const program = {
    subheader: programTitle, // берем первый элемент (так как одна программа у тем)
    href: `${PUBLIC_PROGRAMS_URL}/${topics[0].program.id}`
  }

  program.items = topics.map(({ title, id, notes }) => (
    {
      title,
      href: `${PUBLIC_PROGRAMS_URL}/${programId}/topics/${id}`,
      icon: FolderIcon,
      items: notesMenu(notes, programId, id)
    }

  ))

  return [program]
}

export const generateTopicsMenu = (topics, loading) => {
  if (loading || !topics.length) {
    return [
      ...initialMenu,
      ...additionalMenu
    ]
  }
  return [
    ...initialMenu,
    ...topicsMenu(topics),
    ...additionalMenu
  ]
}

export default generateTopicsMenu
