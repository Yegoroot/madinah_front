/* eslint-disable import/prefer-default-export */
import { BookOpen, Home } from 'react-feather'

export const publicMenu = [{
  subheader: '',
  href: '/programs',
  items: [
    {
      title: 'Home',
      href: '/home',
      icon: Home
    },
    {
      title: 'menu.programs',
      href: '/programs',
      icon: BookOpen
    },
  ]
}]

// const additionalMenu = [{
//   subheader: '',
//   href: '/app/account',
//   items: [
//     {
//       title: 'menu.home',
//       href: '/home',
//       icon: Home
//     },
//     {
//       title: 'menu.programs',
//       href: '/programs',
//       icon: BookOpen
//     },
//     // {
//     //   title: 'Account',
//     //   href: '/app/account',
//     //   icon: UserIcon
//     // },
//     // {
//     //   title: 'Contacts',
//     //   href: '/contacts',
//     //   icon: UserIcon
//     // },
//   ]
// }]
