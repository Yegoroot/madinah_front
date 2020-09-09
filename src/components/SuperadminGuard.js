import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'

const SuperadminGuard = ({ children }) => {
  const { user } = useAuth()

  if (!user || user.role !== 'superadmin') {
    return <Redirect to="/app/account" />
  }

  /** */

  return (
    <>
      {children}
    </>
  )
}

SuperadminGuard.propTypes = {
  children: PropTypes.node
}

export default SuperadminGuard
