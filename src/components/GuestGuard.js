import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PROGRAMS_URL } from 'src/constants'
import useAuth from '../hooks/useAuth'

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Redirect to={PROGRAMS_URL} />
  }

  return (
    <>
      {children}
    </>
  )
}

GuestGuard.propTypes = {
  children: PropTypes.node
}

export default GuestGuard
