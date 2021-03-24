// eslint-disable-next-line camelcase
import { perm_work_with_program } from 'src/utils/permissions'
import { defineManagment, publicMenu } from 'src/layouts/menus'

export const defineSectionsByRole = ({ role = 'user' }) => {
  const managment = perm_work_with_program(role) ? defineManagment(role) : []

  return [
    ...publicMenu,
    ...managment
  ]
}

export default defineSectionsByRole
