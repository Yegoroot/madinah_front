/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  noteOriginal: {
    marginBottom: theme.spacing(1),
    fontSize: 30
  },
}))

const Header = ({ noteOriginal, noteTranslate }) => {
  const classes = useStyles()
  return (
    <Box mb={4}>
      <Typography
        variant="h3"
        color="textPrimary"
        className={clsx({
          [classes.noteOriginal]: true,
          ar: true
        })}
      >
        <div ref={noteOriginal} />
      </Typography>
      <Box mt={1}>
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
