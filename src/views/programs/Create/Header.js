import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { PROGRAMS_URL } from 'src/constants'
import {
  // Breadcrumbs,
  Button,
  Grid,
  // Link,
  Typography,
  makeStyles
} from '@material-ui/core'
// import NavigateNextIcon from '@material-ui/icons/NavigateNext'

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

        <Typography
          variant="h1"
          color="textPrimary"
        >
          {id ? 'Edit program' : 'Create a new program'}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${PROGRAMS_URL}`}
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
