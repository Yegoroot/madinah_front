import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CAN_WORK_WITH_PROGRAM } from 'src/utils/permissions'
import useAuth from '../hooks/useAuth'

const ProgramGuard = ({ children }) => {
  const { user } = useAuth()

  if (!user || !CAN_WORK_WITH_PROGRAM.includes(user.role)) {
    return <Redirect to="/app/info" />
  }

  /** */

  return (
    <>
      {children}
    </>
  )
}

ProgramGuard.propTypes = {
  children: PropTypes.node
}

export default ProgramGuard
