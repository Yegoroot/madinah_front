import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function Create({ className }: {className: string}):any {
  const onCreateDictionary = () => {
    console.log('create')
    // dispatch
  }

  return (
    <div className={className}>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
      >
        {/* {t('menu.programs')} */}
        Create Dictionary
      </Button>
    </div>
  )
}
