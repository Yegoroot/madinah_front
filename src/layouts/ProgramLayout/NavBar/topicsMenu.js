import {
  Minus,
  // User as UserIcon,
  BookOpen,
  Home,

} from 'react-feather'

import { PUBLIC_PROGRAMS_URL } from 'src/constants'

// const initialMenu = [{
//   subheader: 'menu.manage.program',
//   items: [
//     {
//       title: 'All Programs',
//       icon: BookOpen,
//       href: `${PUBLIC_PROGRAMS_URL}`
//     }
//   ]
// }]

const additionalMenu = [{
  subheader: '',
  href: '/app/account',
  items: [
    {
      title: 'menu.home',
      href: '/home',
      icon: Home
    },
    {
      title: 'menu.programs',
      href: '/programs',
      icon: BookOpen
    },
    // {
    //   title: 'Account',
    //   href: '/app/account',
    //   icon: UserIcon
    // },
    // {
    //   title: 'Contacts',
    //   href: '/contacts',
    //   icon: UserIcon
    // },
  ]
}]

const topicsMenu = (topics) => {
  const programId = topics[0].program.id
  const programTitle = topics[0].program.title
  const program = {
    subheader: programTitle, // берем первый элемент (так как одна программа у тем)
    href: `${PUBLIC_PROGRAMS_URL}/${topics[0].program.id}`
  }

  program.items = topics.map(({ title, id }) => (
    {
      title: `${title}`,
      href: `${PUBLIC_PROGRAMS_URL}/${programId}/topics/${id}`,
      icon: Minus
    }

  ))

  return [program]
}

export const generateTopicsMenu = (topics, loading) => {
  if (loading || !topics.length) {
    return [
      // ...initialMenu,
      ...additionalMenu
    ]
  }
  return [
    // ...initialMenu,
    ...topicsMenu(topics),
    ...additionalMenu
  ]
}

export default generateTopicsMenu
