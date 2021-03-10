import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { HOST, routeAuthSocial } from 'src/constants'

const useStyles = makeStyles((/* theme */) => ({
  googleButton: {
    display: 'flex',
    cursor: 'pointer',
    background: '#3a78ae',
    borderRadius: 4,
    color: '#fff',
    paddingRight: 16,
    alignSelf: 'flex-start',
    fontSize: 'initial',
    lineHeight: '35px'
  },
  googleLetter: {
    marginRight: 14,
    fontWeight: 'bold',
    background: 'white',
    borderRadius: '4px 0px 0px 4px',
    backgroundColor: '#fff',
    color: '#3a78ae',
    paddingRight: 12,
    paddingLeft: 12,
    display: 'block'
  }
}))

export const GoogleButton = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const handleGoogleClick = () => {
    window.open(`${HOST}${routeAuthSocial}/google`, '_self')
  }
  return (
    <div
      className={classes.googleButton}
      onClick={handleGoogleClick}
    >
      <span className={classes.googleLetter}>G</span>
      {t('btn.Sign in with google')}
    </div>
  )
}

export const FacebookButton = () => {
  const a = 'd'
  return (
    <div>
      sd
    </div>
  )
}
