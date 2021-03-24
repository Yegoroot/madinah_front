import { Minus } from 'react-feather'
import { publicMenu } from 'src/layouts/menus'
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

const topicsMenu = (topics) => {
  const programId = topics[0].program.id
  const programTitle = topics[0].program.title
  const program = {
    subheader: programTitle, // берем первый элемент (так как одна программа у тем)
    href: `${PUBLIC_PROGRAMS_URL}/${topics[0].program.id}`
  }

  program.items = topics.map(({ title, id, publish }) => (
    {
      title: `${title}`,
      href: `${PUBLIC_PROGRAMS_URL}/${programId}/topics/${id}`,
      icon: Minus,
      unpublish: !publish
    }

  ))

  return [program]
}

export const generateTopicsMenu = (topics, loading) => {
  if (loading || !topics.length) {
    return [
      // ...initialMenu,
      ...publicMenu
    ]
  }
  return [
    // ...initialMenu,
    ...topicsMenu(topics),
    ...publicMenu
  ]
}

export default generateTopicsMenu
