import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import useSettings from '../hooks/useSettings'

const Logo = (props) => {
  const { settings } = useSettings()
  return (

    <RouterLink
      to="/"
      style={{ display: 'flex' }}
    >
      <img
        alt="Logo"
        src={`/static/images/logo/dua/${settings.theme}.png`}
        {...props}
      />
    </RouterLink>
  )
}

export default Logo
