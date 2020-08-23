// eslint-disable-next-line camelcase
import { perm_work_with_program } from 'src/utils/permissions'
import { defineEducation, defineManagment, account } from './menus'

export const defineSectionsByRole = ({ role = 'user' }) => {
  const education = defineEducation(role)
  const managment = perm_work_with_program(role) ? defineManagment(role) : []

  return [
    ...education,
    ...managment,
    ...account
  ]
}

export default defineSectionsByRole
