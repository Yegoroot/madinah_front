import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { HOST } from 'src/constants'
import axios from 'src/utils/axios'
import WindowOpener from 'react-window-opener'

const useStyles = makeStyles((/* theme */) => ({
  googleButton: {
    display: 'flex',
    cursor: 'pointer',
    background: '#ae423a',
    borderRadius: 4,
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
    color: '#ae423a',
    paddingRight: 12,
    paddingLeft: 12,
    display: 'block'
  }
}))

export const GoogleButton = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const childResponse = (e) => console.log('s--', e)
  // const loginByGoogle = async () => {
  //   // const res = await axios.get('https://madinah.best/api/v1/auth/google')
  //   // console.log(res)
  //   const a = window.open('https://madinah.best/api/v1/auth/google', '_self', '', true)
  // }
  return (
    <WindowOpener
      url="/popUp-URL"
      bridge={childResponse}
    >
      <div
        className={classes.googleButton}
        // onClick={loginByGoogle}
      >
        <span className={classes.googleLetter}>G</span>
        {t('btn.Sign in with google')}

      </div>
    </WindowOpener>
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
