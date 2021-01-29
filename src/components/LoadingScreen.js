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
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  transparent: {
    background: 'none'
  },
  absolute: {
    position: 'absolute'
  }
}))

const LoadingScreen = ({ transparent, absolute }) => {
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
      [classes.absolute]: absolute,
    })}
    >
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  )
}

export default LoadingScreen
