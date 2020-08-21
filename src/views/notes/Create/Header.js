import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Button,
  Grid,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core'

import { NOTES_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, id, ...rest }) {
  const classes = useStyles()

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Box pb="3">
          <Typography
            variant="h1"
            color="textPrimary"
          >
            {id ? `Edit Note ${id}` : 'Create a new note' }
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${NOTES_URL}`}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
