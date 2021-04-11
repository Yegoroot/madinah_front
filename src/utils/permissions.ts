/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { userType } from 'src/contexts/AuthContext'

export const ROLES = ['superadmin', 'admin', 'teacher', 'user']
export const CAN_WORK_WITH_USERS = ['superadmin', 'admin']
export const CAN_WORK_WITH_PROGRAM = ['superadmin', 'admin', 'teacher']

export const perm_work_with_program = (role: any): boolean => CAN_WORK_WITH_PROGRAM.includes(role)
export const perm_work_with_users = (role: any): boolean => CAN_WORK_WITH_USERS.includes(role)
// eslint-disable-next-line max-len
export const document_is_my_own = (user: userType | null, documentUser: any): boolean => {
  if (!user) { return false }
  if (user.role === 'superadmin') return true
  if (!documentUser) return false
  if (user._id === documentUser._id) return true
  return false
}

export const is_superadmin = (user: any): boolean => (user ? user.role === 'superadmin' : false)
