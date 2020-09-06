/* eslint-disable camelcase */
export const ROLES = ['superadmin', 'admin', 'teacher', 'user']
export const CAN_WORK_WITH_USERS = ['superadmin', 'admin']
export const CAN_WORK_WITH_PROGRAM = ['superadmin', 'admin', 'teacher']

export const perm_work_with_program = (role) => CAN_WORK_WITH_PROGRAM.includes(role)
export const perm_work_with_users = (role) => CAN_WORK_WITH_USERS.includes(role)
export const document_is_my_own = ({ role, _id }, documentUserId) => _id === documentUserId || role === 'superadmin'

export const is_superadmin = (user) => (user ? user.role === 'superadmin' : false)
export const document_was_created_my_user = (/* user */) => true

/**
 * если из админки открыт материал, то это значит что он владелец или суперадмин
 */
export const get_item = ({ location, user }) => {
  const fromDashboard = location.state ? location.state.fromDashboard : null
  return fromDashboard || is_superadmin(user)
}
