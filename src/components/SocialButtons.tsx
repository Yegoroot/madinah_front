import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { HOST, routeAuthSocial } from 'src/constants'
import clsx from 'clsx'

import googleImg from 'src/assets/images/google.png'
import githubImg from 'src/assets/images/github.png'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    cursor: 'pointer',
    borderRadius: 4,
    padding: 1,
    paddingRight: 8,
    alignItems: 'center',
    color: '#fff',
    fontSize: 'initial'
  },
  googleButton: {
    background: '#1a73e8'
  },
  githubButton: {
    background: '#0d1117'
  },
  img: {
    width: 40,
    background: '#fff',
    padding: 5,
    marginRight: 14,
    borderRadius: '4px 0px 0px 4px',
  },
  social: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: 16
  },
  or: {
    margin: '40px 0 0px',
    textAlign: 'center',
    'line-height': 1,
    position: 'relative',
    '&:before, &:after': {
      content: '""',
      width: 1,
      height: 15,
      top: -25,
      left: '50%',
      background: theme.palette.text.secondary,
      position: 'absolute'
    },
    '&:after': {
      top: 'initial',
      bottom: -25
    }
  }
}))

const handleClick = (provider: string) => {
  window.open(`${HOST}${routeAuthSocial}/${provider}`, '_self')
}

export const GoogleButton = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div
      className={clsx(classes.googleButton, classes.button)}
      onClick={() => handleClick('google')}
    >
      <img
        className={classes.img}
        src={googleImg}
        alt="google"
      />
      {t('btn.Sign in with google')}
    </div>
  )
}

export const GithubButton = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div
      className={clsx(classes.githubButton, classes.button)}
      onClick={() => handleClick('github')}
    >
      <img
        className={classes.img}
        src={githubImg}
        alt="github"
      />
      {t('btn.Sign in with github')}
    </div>
  )
}

export const AuthBySocial = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <>
      <div className={classes.social}>
        <GoogleButton />
        <GithubButton />

      </div>
      <Typography
        className={classes.or}
        variant="body2"
        color="textSecondary"
      >
        {t('pageAuth.or')}
      </Typography>

    </>
  )
}
