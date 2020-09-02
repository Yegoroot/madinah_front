// eslint-disable-next-line camelcase
import { perm_work_with_program } from 'src/utils/permissions'
import { defineManagment, account } from './menus'

export const defineSectionsByRole = ({ role = 'user' }) => {
  const managment = perm_work_with_program(role) ? defineManagment(role) : []

  return [
    ...managment,
    ...account
  ]
}

export default defineSectionsByRole
