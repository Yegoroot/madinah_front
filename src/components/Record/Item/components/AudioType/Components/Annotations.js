import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  noteOriginal: {
    marginRight: theme.spacing(1)
  },
}))

const Header = ({ noteOriginal, noteTranslate }) => {
  const classes = useStyles()
  return (
    <Box mb={2}>
      <Typography
        variant="h4"
        color="textPrimary"
        className={clsx({
          [classes.noteOriginal]: true,
          ar: true
        })}
      >
        <div ref={noteOriginal} />
      </Typography>
      <Box mb={2}>
        <Typography
          variant="h6"
          color="textPrimary"
          className="ar"
        >
          <div ref={noteTranslate} />
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
