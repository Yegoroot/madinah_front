import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CAN_WORK_WITH_USERS } from 'src/utils/permissions'
import useAuth from '../hooks/useAuth'

const UserGuard = ({ children }) => {
  const { user } = useAuth()

  if (!user || !CAN_WORK_WITH_USERS.includes(user.role)) {
    return <Redirect to="/app" />
  }

  return (
    <>
      {children}
    </>
  )
}

UserGuard.propTypes = {
  children: PropTypes.node
}

export default UserGuard
