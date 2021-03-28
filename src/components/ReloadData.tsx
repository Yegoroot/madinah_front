/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import React from 'react'
import LoadingScreen from 'src/components/LoadingScreen'
import { Button, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    height: '100%',
    'align-items': 'center',
    width: '100%',
    gridGap: theme.spacing(2),
    'justify-content': 'center',
    'grid-template-areas':
        `". . . ."
         ". a b ."
         ". . . ."`,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  b1: {
    gridArea: 'a'
  },
  b2: {
    gridArea: 'b'
  }
}))

export const ReloadData = (
  { loading, data, onClick }: { loading: boolean | string, data: any, onClick: ()=> any }
) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()

  if (loading === 'reload') {
    return (
      <div
        className={classes.root}
      >
        <Button
          onClick={onClick}
          variant="outlined"
          color="secondary"
          className={classes.b1}
        >
          {t('btn.reload')}
        </Button>
        <Button
          variant="outlined"
          className={classes.b2}
          onClick={() => history.push('/home')}
        >
          {t('btn.return home')}
        </Button>
      </div>
    )
  }
  if (loading || !data) {
    return <LoadingScreen />
  }
  return null
}

export default ReloadData
