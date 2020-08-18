import React from 'react'
import useSettings from '../hooks/useSettings'

const Logo = (props) => {
  const { settings } = useSettings()
  return (
    <img
      alt="Logo"
      src={`/static/images/logo/dua/${settings.theme}.png`}
      {...props}
    />
  )
}

export default Logo
