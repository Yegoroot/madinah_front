// eslint-disable-next-line camelcase
import { defineEducation, account } from './menus'

export const defineSectionsByRole = ({ role = 'user' }) => {
  const education = defineEducation(role)

  return [
    ...education,
    ...account
  ]
}

export default defineSectionsByRole
