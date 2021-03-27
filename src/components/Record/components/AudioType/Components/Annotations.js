import React, { memo } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import DOMPurify from 'dompurify'

const useStyles = makeStyles((theme) => ({
  annotations: {},
  annotationsActive: {
    position: 'fixed',
    bottom: 54,
    background: theme.palette.background.dark,
    padding: 20,
    paddingBottom: 10,
    opacity: 0.92,
    right: 0,
    marginTop: 0,
    marginBottom: 0,
    zIndex: 101,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 0px 3px 1px rgba(0,0,0,0.50)',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 256px)'
    },
    // '&:before': {
    //   content: '""',
    //   width: '100%',
    //   position: 'absolute',
    //   top: -40,
    //   height: 40,
    //   left: 0,
    //   background: `linear-gradient(0deg, ${theme.palette.background.default}, transparent)`
    // }
  }
}))

// console.log('HTML in Annotations', html)
const Annotations = ({ html, isActive }) => {
  const classes = useStyles()
  const clean = DOMPurify.sanitize(html)

  return html ? (
    <Box
      mt={4}
      mb={4}
      className={
        clsx({
          [classes.root]: true,
          [classes.annotationsActive]: isActive
        })
      }
    >
      <div
        dangerouslySetInnerHTML={{ __html: clean }}
        className={clsx({
          ar: true
        })}
      />
    </Box>
  ) : null
}

export default memo(Annotations)
