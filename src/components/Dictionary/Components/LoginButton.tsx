import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function LoginButton({ className }: {className: string}):any {
  const { t } = useTranslation()
  return (
    <div className={className}>
      {t('dict.to use your dictionary, please log in')}
      <br />
      <Button
        style={{ marginTop: 8 }}
        component={RouterLink}
        to="/login"
        color="primary"
        variant="outlined"
      >
        {t('pageAuth.login')}
      </Button>
    </div>
  )
}
