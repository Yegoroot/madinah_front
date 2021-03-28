/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import {
  Box,
  LinearProgress,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    // backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    flexBasis: '100%',
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  transparent: {
    background: 'none'
  },
  absolute: {
    position: 'absolute'
  },
  fullWidth: {
    width: '100%'
  }
}))

const LoadingScreen = ({ transparent, absolute, fullWidth }
  : {transparent?: boolean, absolute?: boolean, fullWidth?: boolean}) => {
  const classes = useStyles()
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <div className={clsx({
      [classes.root]: true,
      [classes.transparent]: transparent,
      [classes.absolute]: absolute
    })}
    >
      <Box
        width={320}
        className={clsx({
          [classes.fullWidth]: fullWidth
        })}
      >
        <LinearProgress
          color="secondary"
        />
      </Box>
    </div>
  )
}

export default LoadingScreen
