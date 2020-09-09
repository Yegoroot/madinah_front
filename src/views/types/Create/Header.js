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
import { TYPES_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Header({ className, type, ...rest }) {
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
          {type ? 'Edit type' : 'Create a new type'}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={`${TYPES_URL}`}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  type: PropTypes.object,
}

export default Header
