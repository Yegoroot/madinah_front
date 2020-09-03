import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import { USERS_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, user, ...rest }) {
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
        <Typography
          variant="h1"
          color="textPrimary"
        >
          {user ? 'Edit user' : 'Create a new user'}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${USERS_URL}`}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
}

export default Header
