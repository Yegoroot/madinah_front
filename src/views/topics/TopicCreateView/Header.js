import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

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
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management/topics"
            component={RouterLink}
          >
            Topics
          </Link>
          {id ? (
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {id}
            </Typography>
          ) : null}

        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {id ? 'Edit topic' : 'Create a new topic'}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to="/app/management/products"
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
