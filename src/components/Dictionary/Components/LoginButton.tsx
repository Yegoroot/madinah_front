import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function LoginButton({ className }: {className: string}):any {
  return (
    <div className={className}>
      To use your personal dictionary
      <br />
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
      >
        {/* {t('menu.programs')} */}
        Log in
      </Button>
    </div>
  )
}
